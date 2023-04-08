import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import List from "../../components/List/List";
import { AreaChart, Area } from "recharts";
import "./single.scss";
const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/11392488/pexels-photo-11392488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
                className="itemImg "
              />
              <div className="details">
                <h1 className="itemTitle"> John Snow</h1>
                <div className="detailItem">
                  <span className="itemkey">Email:</span>
                  <span className="itemvalue">Snow@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone:</span>
                  <span className="itemvalue">+91 0923809213</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Address:</span>
                  <span className="itemvalue"> 2121, high-street,Delhi</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Country:</span>
                  <span className="itemvalue"> India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={2 / 1}
              title="Total Blogs in last six months"
              type={AreaChart}
              typename={Area}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recently created Blogs</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
