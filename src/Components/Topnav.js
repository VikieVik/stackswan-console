import React, { useState } from "react";
import "./Topnav.css";
import stackswanLogo from "../img/stackswan-logo-name.svg";

// BLE control functions
import {
  sendToBleDevice,
  connectToBleDevice,
  startReadingBleDevice,
  stopReadingBleDevice,
} from "../Components/BLE";

export default function Topnav() {
  const [inputData, setInputData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form sending
    sendToBleDevice(inputData);
    event.target.value = "";
  };

  const handleInputChnage = (event) => {
    event.preventDefault(); // Prevent form sending
    setInputData(event.target.value);
  };

  function clearInputField() {
    const handleInputChnage = (event) => {
      event.preventDefault(); // Prevent form sending
      event.target.value = "";
    };
  }

  return (
    <div className="Topnav">
      <div className="navbar">
        <img id="bluebird-logo" src={stackswanLogo} />
        <div className="controls">
          <button id="read" onClick={connectToBleDevice}>
            Connect
          </button>
          <button id="start" onClick={startReadingBleDevice}>
            Start
          </button>
          <button id="stop" onClick={stopReadingBleDevice}>
            Stop
          </button>

          <form id="send-form" onSubmit={handleSubmit}>
            <input
              id="input"
              type="search"
              placeholder="Data to send ..."
              onChange={handleInputChnage}
            />
            <button id="submit" type="submit">
              Send
            </button>
          </form>
        </div>

        <main>
          <div className="data-container"></div>
        </main>
      </div>
    </div>
  );
}
