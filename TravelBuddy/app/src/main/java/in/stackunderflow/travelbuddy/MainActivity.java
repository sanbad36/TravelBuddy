package in.stackunderflow.travelbuddy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import in.stackunderflow.travelbuddy.data.RapidApiPanVerificationRequest;
import in.stackunderflow.travelbuddy.data.RapidApiPanVerificationRequestData;
import in.stackunderflow.travelbuddy.data.RapidApiPanVerificationResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViewById(R.id.tv_login).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                verify();
            }
        });
        NotificationChannel channel = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            channel = new NotificationChannel("general",
                    "General", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("General Data");
            getSystemService(NotificationManager.class).createNotificationChannel(channel);
        }
        checkExistingUser();
    }

    private void checkExistingUser() {
        SharedPreferences sharedPreferences = getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE);
        if(sharedPreferences.contains("uid")) {
            startActivity(new Intent(this,DashboardActivity.class));
            finish();
        }
    }


    private void verify() {
        findViewById(R.id.tv_login).setVisibility(View.INVISIBLE);
        String inputPanNumber = ((EditText)findViewById(R.id.username_input)).getText().toString().replace(" ","").toUpperCase();
        if(inputPanNumber==null || inputPanNumber.length()!=10) {
            Toast.makeText(this, "Invalid PAN number", Toast.LENGTH_SHORT).show();
            findViewById(R.id.tv_login).setVisibility(View.VISIBLE);
            return;
        }
        String inputName = ((EditText)findViewById(R.id.password)).getText().toString().toUpperCase();
        if(inputName==null || inputName.replace(" ","").length()==0) {
            Toast.makeText(this, "Invalid name", Toast.LENGTH_SHORT).show();
            findViewById(R.id.tv_login).setVisibility(View.VISIBLE);
            return;
        }
        String uid = Utility.getMd5(inputPanNumber+" "+inputName);
        FirebaseDatabase.getInstance().getReference("users").child(uid).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.getValue()==null) {
                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl(AppConstants.BaseUrl.RAPID_API_PAN_CARD_VERIFICATION)
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();
                    RestApi restApi = retrofit.create(RestApi.class);
                    RapidApiPanVerificationRequest request = new RapidApiPanVerificationRequest();
                    request.setTaskId(AppConstants.RequestParameters.RAPID_API_PAN_CARD_VERIFICATION_TASK_ID);
                    request.setGroupId(AppConstants.RequestParameters.RAPID_API_PAN_CARD_VERIFICATION_GROUP_ID);
                    RapidApiPanVerificationRequestData data = new RapidApiPanVerificationRequestData();
                    data.setIdNumber(inputPanNumber);
                    request.setData(data);
                    Call<RapidApiPanVerificationResponse> call = restApi.getPanCardDetails(request);
                    call.enqueue(new Callback<RapidApiPanVerificationResponse>() {
                        @Override
                        public void onResponse(Call<RapidApiPanVerificationResponse> call, Response<RapidApiPanVerificationResponse> response) {
                            if(inputName.equals(response.body().getResult().getSourceOutput().getName())) {
                                Toast.makeText(MainActivity.this, "Verified", Toast.LENGTH_SHORT).show();
                                snapshot.getRef().child("name").setValue(inputName);
                                SharedPreferences sharedPreferences = getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE);
                                SharedPreferences.Editor editor = sharedPreferences.edit();
                                editor.putString("uid",uid);
                                editor.putString("name",inputName);
                                editor.apply();
                                startActivity(new Intent(getApplicationContext(),DashboardActivity.class));
                                finish();
                            }
                            else {
                                Toast.makeText(MainActivity.this, "Invalid Name or PAN card number", Toast.LENGTH_SHORT).show();
                                findViewById(R.id.tv_login).setVisibility(View.VISIBLE);
                            }
                        }

                        @Override
                        public void onFailure(Call<RapidApiPanVerificationResponse> call, Throwable t) {
                        }
                    });
                }
                else {
                    SharedPreferences sharedPreferences = getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("uid",uid);
                    editor.putString("name",inputName);
                    editor.apply();
                    startActivity(new Intent(getApplicationContext(),DashboardActivity.class));
                    finish();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}