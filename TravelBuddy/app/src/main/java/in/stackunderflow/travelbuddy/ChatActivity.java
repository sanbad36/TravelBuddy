package in.stackunderflow.travelbuddy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;

import in.stackunderflow.travelbuddy.adapters.ChatAdapter;
import in.stackunderflow.travelbuddy.data.RequestNotification;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChatActivity extends AppCompatActivity {

    private long offset;
    private String name;
    private static ChatActivity instance;
    private ChatAdapter adapter;
    private ArrayList<ChatData> chatDataArrayList;
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);
        instance = this;
        chatDataArrayList = new ArrayList<>();
        adapter = new ChatAdapter(chatDataArrayList);
        recyclerView = findViewById(R.id.rv_chat);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);
        FirebaseDatabase.getInstance().getReference(".info/serverTimeOffset").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                offset = snapshot.getValue(Long.class);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
        FirebaseDatabase.getInstance().getReference("users").child(getIntent().getStringExtra("uid")).child("name").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.getValue()==null) name = "Mia Khalifa";
                else name = snapshot.getValue().toString();
                loadUi();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
        findViewById(R.id.send).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String text = ((EditText)findViewById(R.id.et_message)).getText().toString();
                ((EditText)findViewById(R.id.et_message)).setText("");
                View view = getCurrentFocus();
                if (view != null) {
                    InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
                }
                long time = System.currentTimeMillis()+offset;
                if(text==null||text.replace(" ","").replace("\n","").length()==0) {
                    Toast.makeText(ChatActivity.this, "Cannot send empty message", Toast.LENGTH_SHORT).show();
                    return;
                }
                RequestNotification requestNotification = new RequestNotification();
                HashMap<String, Object> data = new HashMap<>();
                data.put("uid",getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE).getString("uid","no uid"));
                data.put("message",text);
                data.put("chat",true);
                data.put("name",getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE).getString("name","no name"));
                data.put("timestamp",time+"");
                requestNotification.setData(data);
                requestNotification.setPriority("high");
                requestNotification.setToken("/topics/"+getIntent().getStringExtra("uid"));
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("https://fcm.googleapis.com/")
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
                RestApi restApi = retrofit.create(RestApi.class);
                Call<ResponseBody> call = restApi.sendNotification(requestNotification);
                call.enqueue(new Callback<ResponseBody>() {
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        SharedPreferences preferences = getSharedPreferences("chat_with_"+getIntent().getStringExtra("uid"),MODE_PRIVATE);
                        SharedPreferences.Editor editor = preferences.edit();
                        editor.putString(time+"","OUTGOING "+text);
                        editor.apply();
                        if(ChatActivity.getInstance()!=null) ChatActivity.getInstance().loadData(getIntent().getStringExtra("uid"));
                    }

                    @Override
                    public void onFailure(Call<ResponseBody> call, Throwable t) {

                    }
                });

            }
        });
    }

    private void loadUi() {
        ((TextView)findViewById(R.id.toolbar_title)).setText(name);
        Toolbar toolbar = findViewById(R.id.myToolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        loadData(getIntent().getStringExtra("uid"));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        instance = null;
    }

    public static ChatActivity getInstance() {
        return instance;
    }

    public void loadData(String uid) {
        if(!uid.equals(getIntent().getStringExtra("uid"))) return;
        SharedPreferences preferences = getSharedPreferences("chat_with_"+uid,MODE_PRIVATE);
        chatDataArrayList.clear();
        for(String str: preferences.getAll().keySet()) {
            ChatData chatData = new ChatData();
            chatData.setMessage(preferences.getString(str,"INCOMING corrupted message"));
            chatData.setTime(Long.parseLong(str));
            chatDataArrayList.add(chatData);
        }

        ChatData[] chatData = new ChatData[chatDataArrayList.size()];
        int count = 0;
        for(ChatData cd: chatDataArrayList) chatData[count++]=cd;
        for(int i=0;i<chatData.length-1;i++) {
            for(int j=0;j<chatData.length-1-i;j++) {
                if(chatData[j].getTime()>chatData[j+1].getTime()) {
                    ChatData temp = chatData[j];
                    chatData[j] = chatData[j+1];
                    chatData[j+1] = temp;
                }
            }
        }
        chatDataArrayList.clear();
        chatDataArrayList.addAll(Arrays.asList(chatData));
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                adapter.setChatDataArrayList(chatDataArrayList);
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        recyclerView.scrollToPosition(chatDataArrayList.size()-1);
                    }
                },600);
            }
        });
    }
}