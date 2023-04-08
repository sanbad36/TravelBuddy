package in.stackunderflow.travelbuddy;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.util.UUID;

import in.stackunderflow.travelbuddy.adapters.BluetoothDeviceItemAdapter;

public class BluetoothDevicesActivity extends AppCompatActivity {

    private static final int REQUEST_ENABLE_BT = 120;
    private static final int PERMISSION_BT_CONNECT = 80;
    private static final int PERMISSION_BLUETOOTH_SCAN = 40;
    private ActivityResultLauncher<Intent> bluetoothEnableResultLauncher;
    private ActivityResultLauncher<Intent> bluetoothScanResultLauncher;
    private BluetoothAdapter bluetoothAdapter;
    private BluetoothDeviceItemAdapter bluetoothDeviceItemAdapter;
    private String MY_UUID;
    private String NAME = "Travel Buddy";
    private String TAG = "Bluetooth_Activity";
    private AcceptThread acceptThread;
    private static BluetoothDevicesActivity instance;

    private class ConnectThread extends Thread {
        private BluetoothSocket mmSocket;
        private BluetoothDevice mmDevice;
        private String MY_UUID;

        public ConnectThread(BluetoothDevice device) {
            // Use a temporary object that is later assigned to mmSocket
            // because mmSocket is final.
            BluetoothSocket tmp = null;
            mmDevice = device;
//            MY_UUID = Utility.getMd5(device.getAddress());
//            MY_UUID = MY_UUID.substring(0, 8) + "-" + MY_UUID.substring(8, 12) + "-" + MY_UUID.substring(12, 16) + "-" + MY_UUID.substring(16, 20) + "-" + MY_UUID.substring(20);
            MY_UUID = "00001101-0000-1000-8000-00805f9b34fb";
            Log.println(Log.ASSERT,"my_uuid",MY_UUID);

            try {
                // Get a BluetoothSocket to connect with the given BluetoothDevice.
                // MY_UUID is the app's UUID string, also used in the server code.
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(BluetoothDevicesActivity.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                tmp = device.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));
            } catch (IOException e) {
                Log.e(TAG, "Socket's create() method failed", e);
            }
            mmSocket = tmp;
        }

        public void run() {
            // Cancel discovery because it otherwise slows down the connection.
            if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(BluetoothDevicesActivity.this, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
                return;
            }
            bluetoothAdapter.cancelDiscovery();

            try {
                // Connect to the remote device through the socket. This call blocks
                // until it succeeds or throws an exception.
                mmSocket.connect();
            } catch (IOException connectException) {
                // Unable to connect; close the socket and return.
                try {
                    mmSocket.close();
                } catch (IOException closeException) {
                    Log.e(TAG, "Could not close the client socket", closeException);
                }
                return;
            }

            // The connection attempt succeeded. Perform work associated with
            // the connection in a separate thread.
        }

        // Closes the client socket and causes the thread to finish.
        public void cancel() {
            try {
                mmSocket.close();
            } catch (IOException e) {
                Log.e(TAG, "Could not close the client socket", e);
            }
        }
    }
    private class AcceptThread extends Thread {
        private BluetoothServerSocket mmServerSocket;

        public AcceptThread() {
            // Use a temporary object that is later assigned to mmServerSocket
            // because mmServerSocket is final.
            BluetoothServerSocket tmp = null;
            try {
                // MY_UUID is the app's UUID string, also used by the client code.
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(BluetoothDevicesActivity.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                tmp = bluetoothAdapter.listenUsingRfcommWithServiceRecord(NAME, UUID.fromString(MY_UUID));
            } catch (IOException e) {
                Log.e(TAG, "Socket's listen() method failed", e);
            }
            mmServerSocket = tmp;
        }

        public void run() {
            BluetoothSocket socket = null;
            // Keep listening until exception occurs or a socket is returned.
            while (true) {
                try {
                    socket = mmServerSocket.accept();
                } catch (IOException e) {
                    Log.e(TAG, "Socket's accept() method failed", e);
                    break;
                }

                if (socket != null) {
                    // A connection was accepted. Perform work associated with
                    // the connection in a separate thread.
                    try {
                        mmServerSocket.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    break;
                }
            }
        }

        // Closes the connect socket and causes the thread to finish.
        public void cancel() {
            try {
                mmServerSocket.close();
            } catch (IOException e) {
                Log.e(TAG, "Could not close the connect socket", e);
            }
        }
    }

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                // Discovery has found a device. Get the BluetoothDevice
                // object and its info from the Intent.
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(BluetoothDevicesActivity.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                try {
                    bluetoothDeviceItemAdapter.addDevice(new BluetoothDeviceItem(null,device));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bluetooth_devices);
        instance = this;
        ((TextView)findViewById(R.id.toolbar_title)).setText("People Near Me");
        Toolbar toolbar = findViewById(R.id.myToolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        RecyclerView recyclerView = findViewById(R.id.rv_bluetooth_devices);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter((bluetoothDeviceItemAdapter = new BluetoothDeviceItemAdapter()));
        bluetoothEnableResultLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == Activity.RESULT_OK) {
                            findBluetoothDevices();
                        }
                    }
                });
        bluetoothScanResultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                if (result.getResultCode() == Activity.RESULT_CANCELED) {
                    Toast.makeText(BluetoothDevicesActivity.this, "Unable to find nearby devices", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(BluetoothDevicesActivity.this, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{Manifest.permission.BLUETOOTH_SCAN}, PERMISSION_BLUETOOTH_SCAN);
                    return;
                }
                bluetoothAdapter.startDiscovery();
                if(acceptThread==null) {
//                    MY_UUID = Utility.getMd5(bluetoothAdapter.getAddress());
//                    MY_UUID = MY_UUID.substring(0,8)+"-"+MY_UUID.substring(8,12)+"-"+MY_UUID.substring(12,16)+"-"+MY_UUID.substring(16,20)+"-"+MY_UUID.substring(20);
                    MY_UUID = "00001101-0000-1000-8000-00805f9b34fb";
                    acceptThread = new AcceptThread();
                    acceptThread.start();
                }
            }
        });
        registerReceiver(receiver, new IntentFilter(BluetoothDevice.ACTION_FOUND));
        findBluetoothDevices();
    }

    private void findBluetoothDevices() {
        BluetoothManager bluetoothManager = getSystemService(BluetoothManager.class);
        bluetoothAdapter = bluetoothManager.getAdapter();
        if (bluetoothAdapter == null) {
            // Device doesn't support Bluetooth
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{Manifest.permission.BLUETOOTH_CONNECT}, PERMISSION_BT_CONNECT);
                return;
            }
            if (!bluetoothAdapter.isEnabled()) {
                Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                bluetoothEnableResultLauncher.launch(enableBtIntent);
            } else {
                Intent discoverableIntent =
                        new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300);
                bluetoothScanResultLauncher.launch(discoverableIntent);
            }
        }
    }

    @SuppressLint("MissingPermission")
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case PERMISSION_BT_CONNECT: {
                if(grantResults.length>0 && grantResults[0]!=PackageManager.PERMISSION_DENIED) findBluetoothDevices();
                break;
            }
            case PERMISSION_BLUETOOTH_SCAN: {
                if(grantResults.length>0 && grantResults[0]!=PackageManager.PERMISSION_DENIED) {
                    bluetoothAdapter.startDiscovery();
                }
                break;
            }
        }
    }

    public void connectToBluetoothDevice(BluetoothDevice device) {
        new ConnectThread(device).start();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(receiver);
        if(acceptThread!=null) {
            acceptThread.cancel();
            acceptThread = null;
        }
        instance = null;
    }

    public static BluetoothDevicesActivity getInstance() {
        return instance;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId()==android.R.id.home){
            finishAndRemoveTask();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}