package in.stackunderflow.travelbuddy.data;

import com.google.gson.annotations.SerializedName;


/*
    {
        "action": "verify_with_source",
        "completed_at": "2023-03-31T15:31:42+05:30",
        "created_at": "2023-03-31T15:31:40+05:30",
        "group_id": "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
        "request_id": "a1bf504f-72fd-4630-bc8e-a089a863ef1a",
        "result": {
            "source_output": {
                "aadhaar_seeding_status": true,
                "first_name": "DEVANSH",
                "gender": null,
                "id_number": "CQDPS3301M",
                "last_name": "SAMPAT",
                "middle_name": "SAMIR",
                "name_on_card": "DEVANSH SAMIR SAMPAT",
                "source": "NSDL",
                "status": "id_found"
            }
        },
        "status": "completed",
        "task_id": "74f4c926-250c-43ca-9c53-453e87ceacd1",
        "type": "ind_pan"
    }
*/

public class RapidApiPanVerificationResponse {
    public class Result {
        @SerializedName("source_output") private SourceOutput sourceOutput;

        public SourceOutput getSourceOutput() {
            return sourceOutput;
        }
    }

    public class SourceOutput {
        @SerializedName("status") private String status;
        @SerializedName("name_on_card") private String name;

        public String getStatus() {
            return status;
        }

        public String getName() {
            return name;
        }
    }
    @SerializedName("result")  private Result result;

    public Result getResult() {
        return result;
    }
}

