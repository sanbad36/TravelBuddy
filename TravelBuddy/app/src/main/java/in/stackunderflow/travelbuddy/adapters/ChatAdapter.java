package in.stackunderflow.travelbuddy.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import in.stackunderflow.travelbuddy.ChatData;
import in.stackunderflow.travelbuddy.R;
import in.stackunderflow.travelbuddy.Utility;

public class ChatAdapter extends RecyclerView.Adapter<ChatAdapter.ViewHolder> {

    private Context context;
    private ArrayList<ChatData> chatDataArrayList;

    public ChatAdapter(ArrayList<ChatData> chatDataArrayList) {
        this.chatDataArrayList = chatDataArrayList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        context = parent.getContext();
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.item_chat,parent,false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.setIsRecyclable(false);
        holder.itemView.findViewById(R.id.date).setVisibility(View.GONE);
        holder.itemView.findViewById(R.id.cv_sent).setVisibility(View.GONE);
        holder.itemView.findViewById(R.id.cv_received).setVisibility(View.GONE);
        if(position==0 || !Utility.isSameDay(chatDataArrayList.get(position).getTime(),chatDataArrayList.get(position-1).getTime())) {
            holder.itemView.findViewById(R.id.date).setVisibility(View.VISIBLE);
            ((TextView)holder.itemView.findViewById(R.id.date)).setText(chatDataArrayList.get(position).getDateText());
        }
        if(chatDataArrayList.get(position).getMessage().startsWith("INCOMING ")) {
            holder.itemView.findViewById(R.id.cv_received).setVisibility(View.VISIBLE);
            ((TextView)holder.itemView.findViewById(R.id.tv_received)).setText(chatDataArrayList.get(position).getMessage().substring("INCOMING ".length()));
            ((TextView)holder.itemView.findViewById(R.id.tv_received_time)).setText(chatDataArrayList.get(position).getTimeText());
        }
        else {
            holder.itemView.findViewById(R.id.cv_sent).setVisibility(View.VISIBLE);
            ((TextView)holder.itemView.findViewById(R.id.tv_sent)).setText(chatDataArrayList.get(position).getMessage().substring("OUTGOING ".length()));
            ((TextView)holder.itemView.findViewById(R.id.tv_sent_time)).setText(chatDataArrayList.get(position).getTimeText());
        }
    }

    @Override
    public int getItemCount() {
        return chatDataArrayList.size();
    }

    @SuppressLint("NotifyDataSetChanged")
    public void setChatDataArrayList(ArrayList<ChatData> chatDataArrayList) {
        this.chatDataArrayList = chatDataArrayList;
        notifyDataSetChanged();
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}
