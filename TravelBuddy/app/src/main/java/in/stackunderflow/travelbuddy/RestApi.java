package in.stackunderflow.travelbuddy;

import java.util.Map;

import in.stackunderflow.travelbuddy.data.RapidApiPanVerificationRequest;
import in.stackunderflow.travelbuddy.data.RapidApiPanVerificationResponse;
import in.stackunderflow.travelbuddy.data.RequestNotification;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface RestApi {
    @Headers({
            "Content-Type:application/json",
            "X-Rapidapi-Key:7bd8cdda59mshe09d234498bf77ep17a0dfjsn97f4d06c6ee4",
            "X-RapidApi-Host:pan-card-verification1.p.rapidapi.com"})
    @POST("v3/tasks/sync/verify_with_source/ind_pan")
    Call<RapidApiPanVerificationResponse> getPanCardDetails(@Body RapidApiPanVerificationRequest request);

    @Headers({"Authorization: key=AAAAXrVH8Mk:APA91bGA3ucOGtI6sUHiY74AVRrGEkfTO1JCuST3A-bQfvQRQyjTzYb9468l40mCMDdvZdX8R2K4cawPHk240XWrtAI9_NikVzEgSpFp-lwUJMJGpgbuoVIZi4U-5MEd6Z4OzG2FGtyP",
            "Content-Type:application/json"})
    @POST("fcm/send")
    Call<ResponseBody> sendNotification(@Body RequestNotification requestNotification);

}
