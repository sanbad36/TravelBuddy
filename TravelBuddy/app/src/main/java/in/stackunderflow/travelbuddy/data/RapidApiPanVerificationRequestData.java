package in.stackunderflow.travelbuddy.data;

import com.google.gson.annotations.SerializedName;

public class RapidApiPanVerificationRequestData {
    @SerializedName("id_number")
    private String idNumber;

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }
}
