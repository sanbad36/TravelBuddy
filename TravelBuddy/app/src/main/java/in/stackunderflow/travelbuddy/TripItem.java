package in.stackunderflow.travelbuddy;

public class TripItem {
    private String destination, route, date, description;
    private int cost, imageId;

    public TripItem(String destination, String route, String date, String description, int cost, int imageId) {
        this.destination = destination;
        this.route = route;
        this.date = date;
        this.description = description;
        this.cost = cost;
        this.imageId = imageId;
    }

    public String getDestination() {
        return destination;
    }

    public String getRoute() {
        return route;
    }

    public String getDate() {
        return date;
    }

    public int getCost() {
        return cost;
    }

    public int getImageId() {
        return imageId;
    }

    public String getDescription() {
        return description;
    }
}
