package in.stackunderflow.travelbuddy.data;

import com.google.gson.annotations.SerializedName;

import java.util.HashMap;

public class RequestNotification {
    @SerializedName("to") private String token;
    @SerializedName("notification") private NotificationModel notificationModel;
    @SerializedName("data") private HashMap<String,Object> data;
    @SerializedName("priority") private String priority;

    public void setToken(String token) {
        this.token = token;
    }

    public void setNotificationModel(NotificationModel notificationModel) {
        this.notificationModel = notificationModel;
    }

    public void setData(HashMap<String, Object> data) {
        this.data = data;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
