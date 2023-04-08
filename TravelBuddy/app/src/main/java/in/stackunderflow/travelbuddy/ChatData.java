package in.stackunderflow.travelbuddy;

import java.util.Calendar;

public class ChatData {
    private String message;
    private long time;
    private String[] day = new String[]{"Sun","Mon","Tue","Wed","Thu","Fri","Sat"};
    private String[] month = new String[]{"Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"};

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getDateText() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(time);
        return (day[calendar.get(Calendar.DAY_OF_WEEK)-1]+", "+calendar.get(Calendar.DAY_OF_MONTH)+" "+month[calendar.get(Calendar.MONTH)]+" "+calendar.get(Calendar.YEAR));
    }

    public String getTimeText() {
        String timeString = "";
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(time);
        if(calendar.get(Calendar.HOUR_OF_DAY)<10) timeString+="0";
        timeString+=calendar.get(Calendar.HOUR_OF_DAY)+":";
        if(calendar.get(Calendar.MINUTE)<10) timeString+="0";
        timeString+=calendar.get(Calendar.MINUTE);
        return timeString;
    }

}
