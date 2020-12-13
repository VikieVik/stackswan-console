/**
 * Here Goes BLE Logic
 */
import { addPayload, showPayload } from "./db";

// same as SERVICE_UUID in arduino
var bleService = "afa2f203-348f-4718-9cf3-f7ff0de38472";

// same as CHARACTERISTIC_UUID in arduino
var bleCharacteristic = "450fcc81-dad5-46a6-959f-c5f41e37b669";
var bluetoothDeviceDetected;
var gattCharacteristic;
let bleDeviceConnected = false;
let dataForBleDevice = "";

function isWebBluetoothEnabled() {
  if (!navigator.bluetooth) {
    console.log("Web Bluetooth API is not available in this browser!");
    alert("This browser is not compatible use Google Chrome !");
    return false;
  }

  return true;
}

function getDeviceInfo() {
  let options = {
    acceptAllDevices: true,
    optionalServices: [bleService],
  };

  console.log("Requesting any Bluetooth Device...");
  return navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      bluetoothDeviceDetected = device;
    })
    .catch((error) => {
      console.log("Argh! " + error);
    });
}

function read() {
  return (bluetoothDeviceDetected ? Promise.resolve() : getDeviceInfo())
    .then(connectGATT)
    .then((_) => {
      bleDeviceConnected = true;
      console.log("Reading Bird Data...");
      return gattCharacteristic.readValue();
    })
    .catch((error) => {
      console.log("Waiting to start reading: " + error);
    });
}

function connectGATT() {
  if (bluetoothDeviceDetected.gatt.connected && gattCharacteristic) {
    return Promise.resolve();
  }

  return bluetoothDeviceDetected.gatt
    .connect()
    .then((server) => {
      console.log("Getting GATT Service...");
      return server.getPrimaryService(bleService);
    })
    .then((service) => {
      console.log("Getting GATT Characteristic...");
      return service.getCharacteristic(bleCharacteristic);
    })
    .then((characteristic) => {
      gattCharacteristic = characteristic;
      gattCharacteristic.addEventListener(
        "characteristicvaluechanged",
        handleChangedValue
      );
      // handleChangedValue(gattCharacteristic.readValue());

      gattCharacteristic.readValue();
    });
}

function Decodeuint8arr(uint8array) {
  return new TextDecoder("utf-8").decode(uint8array);
}

// function handleChangedValue(value) {
function handleChangedValue(event) {
  let value = event.target.value;
  let payload = Decodeuint8arr(value);

  //  🐦 save to DB
  addPayload(payload);
  // console.log(payload);
}

function sendToBleDevice(data) {
  data = String(data);
  {
    {
      /* gattCharacteristic = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'; */
    }
  }

  if (!data || !gattCharacteristic) {
    return;
  }

  writeToCharacteristic(gattCharacteristic, data);
  console.log(data, "out");
}

function writeToCharacteristic(characteristic, data) {
  characteristic.writeValue(new TextEncoder().encode(data));
}

function start() {
  gattCharacteristic
    .startNotifications()
    .then((_) => {
      console.log("Start reading...");
      document.querySelector("#start").disabled = true;
      document.querySelector("#stop").disabled = false;
    })
    .catch((error) => {
      console.log("[ERROR] Start: " + error);
    });
}

function stop() {
  gattCharacteristic
    .stopNotifications()
    .then((_) => {
      console.log("Stop reading...");
      document.querySelector("#start").disabled = false;
      document.querySelector("#stop").disabled = true;
    })
    .catch((error) => {
      console.log("[ERROR] Stop: " + error);
    });
}

/**
 * Helper Functions to automate all process
 */
function connectToBleDevice() {
  if (isWebBluetoothEnabled()) {
    read();
  }
}

// Below functions will throw error if called without calling above function

function startReadingBleDevice() {
  if (bleDeviceConnected) {
    start();
  } else {
    alert("Connect to BLE device first !");
  }
}

function stopReadingBleDevice() {
  if (bleDeviceConnected) {
    stop();
  } else {
    alert("Connect to BLE device first !");
  }
}

// export helper functions to use in other components
export {
  bleDeviceConnected,
  dataForBleDevice,
  sendToBleDevice,
  connectToBleDevice,
  startReadingBleDevice,
  stopReadingBleDevice,
};
