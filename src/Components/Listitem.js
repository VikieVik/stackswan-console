import React from "react";
import "./Listitem.css";

/** 
Its a simple List item that is used as alert in 
Alertbar component
**/

function ListItem({ data }) {
  return (
    <div className="ListItem-container">
      <div className="items-row1">
        <h1 id="list-item-element-1">{data.title}</h1>
      </div>
    </div>
  );
}

export default ListItem;
