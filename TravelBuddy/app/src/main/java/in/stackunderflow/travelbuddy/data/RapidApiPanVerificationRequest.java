package in.stackunderflow.travelbuddy.data;

import com.google.gson.annotations.SerializedName;

public class RapidApiPanVerificationRequest {
    @SerializedName("task_id") private String taskId;
    @SerializedName("group_id") private String groupId;
    @SerializedName("data") private RapidApiPanVerificationRequestData data;

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public void setData(RapidApiPanVerificationRequestData data) {
        this.data = data;
    }
}

