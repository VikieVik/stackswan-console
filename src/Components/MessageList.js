import React, { useEffect, useState } from "react";
import "./MessageList.css";
import Message from "./Message";
import db, { showPayload } from "./db";

export default function MessageList() {
  const [dataList, setDataList] = useState([]);
  const [count, setCount] = useState(0);
  const [newDataAvailable, , setNewDataAvailable] = useState(false);

  let dataAvailable = false;

  // clears all message renders
  const clearMessages = () => {
    setDataList([]);
    setCount(0);
  };

  /** 
  useEffect(() => {
    setDataList([]);
    db.allDocs({
      include_docs: true,
      descending: true,
    })
      .then(function (result) {
        let datas = result.rows;
        const dataList = [];
        for (let id in datas) {
          dataList.push(datas[id].docj);
        }
        console.log(dataList);
        setDataList(dataList);
        setCount(dataList.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  */

  function dataStatus() {
    // setDataList([]);
    db.allDocs({
      include_docs: true,
      descending: true,
    })
      .then(function (result) {
        let datas = result.rows;
        const dataList = [];
        for (let id in datas) {
          dataList.push(datas[id].doc);
        }
        console.log(dataList);
        setDataList(dataList);
        setCount(dataList.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  db.changes({
    since: "now",
    live: true,
  }).on("change", dataStatus);

  return (
    <div className="MessageList">
      <div className="label-section">
        <div className="label-row-1">
          <h1 className="label-row-1-item-1">Messages</h1>
          <h1 className="label-row-1-item-2">Total {count}</h1>
          <button className="label-row-1-item-3" onClick={clearMessages}>
            Clear
          </button>
        </div>
        <div className="label-row-2">
          <div id="label-row-2-item-1">Data</div>
          <div id="label-row-2-item-2">Phone</div>
          <div id="label-row-2-item-3">Address</div>
          <div id="label-row-2-item-4">Occupants</div>
          <div id="label-row-2-item-5">Danger</div>
          <div id="label-row-2-item-6">Firstaid</div>
          <div id="label-row-2-item-7">Water</div>
          <div id="label-row-2-item-8">Food</div>
          <div id="label-row-2-item-9">Time</div>
        </div>
      </div>
      <div className="scrollable-section">
        {/**Messages Lists Mapping goes here */}
        {dataList
          ? dataList.map((data, index) => <Message data={data} key={index} />)
          : ""}
      </div>
    </div>
  );
}
