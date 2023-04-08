package in.stackunderflow.travelbuddy.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.HashMap;

import in.stackunderflow.travelbuddy.BluetoothDeviceItem;
import in.stackunderflow.travelbuddy.BluetoothDevicesActivity;
import in.stackunderflow.travelbuddy.R;

public class BluetoothDeviceItemAdapter extends RecyclerView.Adapter<BluetoothDeviceItemAdapter.ViewHolder> {

    private Context context;
    private HashMap<String, BluetoothDeviceItem> map;
    private ArrayList<BluetoothDeviceItem> arrayList;
    private ArrayList<String> colorList;

    public BluetoothDeviceItemAdapter() {
        map = new HashMap<>();
        arrayList = new ArrayList<>();
        colorList = new ArrayList<>();
        colorList.add("#4DD0E1");
        colorList.add("#FFEB3B");
        colorList.add("#E57373");
        colorList.add("#FF7043");
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        context = parent.getContext();
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.item_bluetooth_device,parent,false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        BluetoothDeviceItem item = arrayList.get(position);
        holder.name.setText(item.getDeviceName()!=null?item.getDeviceName():"Unknown Device");
        holder.address.setText(item.getAddress());
        if(colorList!=null && colorList.size()>0) {
            holder.card.setCardBackgroundColor(Color.parseColor(colorList.get(position%colorList.size())));
        }
        holder.layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(BluetoothDevicesActivity.getInstance()!=null) BluetoothDevicesActivity.getInstance().connectToBluetoothDevice(item.getDevice());
            }
        });
    }

    @Override
    public int getItemCount() {
        if(arrayList==null) return 0;
        return arrayList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView name,address;
        public CardView card;
        private LinearLayout layout;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.tv_device_name);
            address = itemView.findViewById(R.id.tv_device_address);
            card = itemView.findViewById(R.id.cv_bluetooth_icon);
            layout = itemView.findViewById(R.id.layout);
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    public void addDevice(BluetoothDeviceItem item) {
        if(!map.containsKey(item.getAddress())) {
            map.put(item.getAddress(),item);
            arrayList.add(item);
            notifyDataSetChanged();
        }
    }
}
