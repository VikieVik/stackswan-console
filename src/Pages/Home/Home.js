import React from "react";
import "./Home.css";
import { Chart } from "react-google-charts";
import Topnav from "../../Components/Topnav";
import MessageList from "../../Components/MessageList.js";

function Home() {
  return (
    <div className="Home">
      <Topnav />
      <div className="main-container">
        <MessageList />
        {/** simple chart */}
        <div className="copyright-info">
          © StackSwan 2020. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Home;
