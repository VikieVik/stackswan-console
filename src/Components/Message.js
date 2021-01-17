import React from "react";
import "./Message.css";

export default function ({ data }) {
  //let obj = JSON.parse(data);
  //console.log(data);

  // get Current timestamp
  var timeStamp = new Date().toLocaleString();

  return (
    <div className="DeviceListItem">
      <div className="item-container">
        <div id="device-list-item-1">{data.title}</div>

        {/**
        *   <div id="device-list-item-2">{data.civilian.info.phone}</div>
        <div id="device-list-item-3">{data.civilian.info.location}</div>
        <div id="device-list-item-4">{data.civilian.info.occupants}</div>
        <div id="device-list-item-5">{data.civilian.status.danger}</div>
        <div id="device-list-item-6">{data.civilian.needs.firstaid}</div>
        <div id="device-list-item-7">{data.civilian.needs.water}</div>
        <div id="device-list-item-8">{data.civilian.needs.food}</div>
        <div id="device-list-item-9">{timeStamp}</div>
        */}
      </div>
    </div>
  );
}
