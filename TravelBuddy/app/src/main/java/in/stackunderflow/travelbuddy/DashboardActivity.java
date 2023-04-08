package in.stackunderflow.travelbuddy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.navigation.NavigationView;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.ArrayList;

import in.stackunderflow.travelbuddy.adapters.RecommendedTripAdapter;

public class DashboardActivity extends AppCompatActivity {

    private NavigationView navigationView;
    private DrawerLayout drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        navigationView=findViewById(R.id.navigationview);
        drawerLayout = findViewById(R.id.drawerlayout);
        Toolbar toolbar = findViewById(R.id.myToolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_baseline_drag_handle_24);
        ActionBarDrawerToggle toggle= new ActionBarDrawerToggle(this, drawerLayout,toolbar,R.string.navigation_open,R.string.navigation_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        String[] permissions = new String[]{Manifest.permission.ACCESS_FINE_LOCATION};
        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.TIRAMISU && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)== PackageManager.PERMISSION_DENIED) {
            permissions = new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.POST_NOTIFICATIONS};
        }
        if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)== PackageManager.PERMISSION_DENIED) {
            requestPermissions(permissions,0);
        }
        else if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.TIRAMISU && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)== PackageManager.PERMISSION_DENIED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS},0);
        }
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch(item.getItemId()) {
                    case R.id.nearby_users: {
                        startActivity(new Intent(DashboardActivity.this,BluetoothDevicesActivity.class));
                        return false;
                    }
                    case R.id.logout: {
                        FirebaseMessaging.getInstance().unsubscribeFromTopic(getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE).getString("uid","no uid"));
                        SharedPreferences.Editor editor = getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE).edit();
                        editor.clear().apply();
                        Toast.makeText(DashboardActivity.this, "Logged Out", Toast.LENGTH_SHORT).show();
                        finish();
                        return false;
                    }
                    case R.id.chat: {
                        SharedPreferences preferences = getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE);
                        String uid = "4bece674d918674b5792b6c3a81f91ae";
                        if(preferences.getString("uid","no uid").equals(uid)) uid = "3640762942fbdee7baddd459cd61762a";
                        Intent intent = new Intent(DashboardActivity.this,ChatActivity.class);
                        intent.putExtra("uid",uid);
                        startActivity(intent);
                    }
                }
                return false;
            }
        });

        RecyclerView recyclerView = findViewById(R.id.rv_recommended_trips);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        ArrayList<TripItem> arrayList = new ArrayList<>();
        arrayList.add(new TripItem("Manali","Delhi-Manali-Delhi","1-10 May 2023","Nestled in the mountains of Himachal Pradesh, Manali is a picturesque hill station that is renowned ...",15000,R.drawable.trip_1));
        arrayList.add(new TripItem("Darjeeling","Kolkata - Darjeeling - Kolkata","16-25 May 2023","Located in the northeastern state of West Bengal, Darjeeling is a charming hill station that is reno...",18000,R.drawable.trip_2));
        arrayList.add(new TripItem("Munnar","ochi - Munnar - Kochi","1-7 August 2023","Located in the Western Ghats of Kerala, Munnar is a stunning hill station that is famous for its tea...",22000,R.drawable.trip_3));
        arrayList.add(new TripItem("Ooty","Bangalore - Ooty - Bangalore","10-18 September 2023","Located in the Nilgiri hills of Tamil Nadu, Ooty is a popular hill station that is renowned for its ...",25000,R.drawable.trip_4));
        RecommendedTripAdapter adapter = new RecommendedTripAdapter(arrayList);
        recyclerView.setAdapter(adapter);


        FirebaseMessaging.getInstance().subscribeToTopic(getSharedPreferences(AppConstants.SharedPreferenceLocations.USER_AUTHENTICATION_CREDENTIALS,MODE_PRIVATE).getString("uid","no uid"));
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.default_action_bar_menu,menu);
        return super.onCreateOptionsMenu(menu);
    }

}