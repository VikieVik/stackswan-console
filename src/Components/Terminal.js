import React, { useState, useEffect } from "react";
import "./Terminal.css";
import Listitem from "./Listitem";
import db, { showPayload } from "./db";

export default function Terminal() {
  const [dataList, setDataList] = useState([]);
  const [count, setCount] = useState(0);
  const [newDataAvailable, , setNewDataAvailable] = useState(false);

  let dataAvailable = false;

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
          dataList.push(datas[id].doc);
        }
        setDataList(dataList);
        setCount(dataList.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  function dataStatus() {
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
    <div className="Terminal">
      <div className="tab-title">
        <h1 id="title-name">Terminal</h1>
        <h1 id="title-name">Count {count}</h1>
      </div>
      <div className="log-section">
        {/* Alerts goes here*/}
        {dataList
          ? dataList.map((data, index) => <Listitem data={data} key={index} />)
          : ""}
      </div>
    </div>
  );
}
