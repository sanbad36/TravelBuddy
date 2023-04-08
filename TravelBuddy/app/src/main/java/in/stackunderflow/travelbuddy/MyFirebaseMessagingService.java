package in.stackunderflow.travelbuddy;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        super.onMessageReceived(message);
        Map<String, String> map = message.getData();
        if (map.containsKey("chat")) {
            SharedPreferences preferences = getSharedPreferences("chat_with_" + map.get("uid"), MODE_PRIVATE);
            SharedPreferences.Editor editor = preferences.edit();
            editor.putString(map.get("timestamp"), "INCOMING " + map.get("message"));
            editor.apply();
            if (ChatActivity.getInstance() != null)
                ChatActivity.getInstance().loadData(map.get("uid"));
            else {
                NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "general");
                int intentFlags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S)
                    intentFlags = intentFlags | PendingIntent.FLAG_MUTABLE;
                PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(), 108, new Intent(getApplicationContext(), ChatActivity.class).putExtra("uid", map.get("uid")), intentFlags);
                builder.setSmallIcon(R.drawable.logo);
                builder.setColor(getColor(R.color.default_app_color));
                builder.setAutoCancel(true);
                builder.setContentTitle(map.get("name"));
                builder.setContentText(map.get("message"));
                builder.setContentIntent(pendingIntent);
                if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                NotificationManagerCompat.from(getApplicationContext()).notify(18, builder.build());
            }
        }
    }

    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);
    }
}
