import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/DataTable/Datatable";
import List from "../../components/List/List";
import "./notification.scss";
import ListSubheader from "@mui/material/ListSubheader";
const Notification = () => {
  return (
    <div className="notification">
      <Sidebar />

      <div className="listContainer">
        <Navbar />
        <ListSubheader
          component="div"
          style={{
            fontSize: "25px",

            fontWeight: "bold",
          }}
          className="notification_title"
        >
          Notifications
        </ListSubheader>
        <List />
      </div>
    </div>
  );
};

export default Notification;
