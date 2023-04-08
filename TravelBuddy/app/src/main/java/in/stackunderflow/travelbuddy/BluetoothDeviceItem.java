package in.stackunderflow.travelbuddy;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothDevice;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;

public class BluetoothDeviceItem {
    private String name, deviceName, address;
    private BluetoothDevice device;

    @SuppressLint("MissingPermission")
    public BluetoothDeviceItem(String name, BluetoothDevice device) {
        this.name = name;
        this.device = device;
        this.deviceName = device.getName();
        this.address = device.getAddress();
    }

    public String getName() {
        return name;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getAddress() {
        return address;
    }

    public BluetoothDevice getDevice() {
        return device;
    }
}
