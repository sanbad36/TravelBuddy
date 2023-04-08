package in.stackunderflow.travelbuddy.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import in.stackunderflow.travelbuddy.R;
import in.stackunderflow.travelbuddy.TripItem;

public class RecommendedTripAdapter extends RecyclerView.Adapter<RecommendedTripAdapter.ViewHolder> {

    private ArrayList<TripItem> arrayList;
    private Context context;

    public RecommendedTripAdapter(ArrayList<TripItem> arrayList) {
        this.arrayList = arrayList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        context = parent.getContext();
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.item_recommended_trip,parent,false));
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        ((TextView)holder.itemView.findViewById(R.id.destination)).setText(arrayList.get(position).getDestination());
        ((TextView)holder.itemView.findViewById(R.id.route)).setText(arrayList.get(position).getRoute());
        ((TextView)holder.itemView.findViewById(R.id.description)).setText(arrayList.get(position).getDescription());
        ((TextView)holder.itemView.findViewById(R.id.cost)).setText("₹"+arrayList.get(position).getCost()+"");
        ((TextView)holder.itemView.findViewById(R.id.date)).setText(arrayList.get(position).getDate());
        ((ImageView)holder.itemView.findViewById(R.id.image)).setImageResource(arrayList.get(position).getImageId());
    }

    @Override
    public int getItemCount() {
        return arrayList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}
