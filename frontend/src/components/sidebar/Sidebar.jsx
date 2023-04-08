import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Travel Buddy</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Admin Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Enrolled User's</span>
            </li>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Send Voucher Code</span>
            </li>
          </Link>
          <Link to="/assignWorkers" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Manual updation</span>
            </li>
          </Link>
          {/*
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Inventory</span>
            </li>
          </Link>
          <Link to="/logistics" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Logistics</span>
            </li>
  </Link>*/}
          {/*
          <Link to="/assignTasks" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Assign Tasks</span>
            </li>
          </Link>

          <Link to="/attendance" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Attendance</span>
            </li>
          </Link>
  */}
          <Link to="/imagetotext" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>OCR</span>
            </li>
          </Link>
          {/*
          <Link to="/leaderboard" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Top Workers</span>
            </li>
          </Link>
          <Link to="/fundDonation" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Fund Donation</span>
            </li>
          </Link>
*/}
          <Link to="/sendReminder" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Send Reminder</span>
            </li>
          </Link>
          {/* <li>
            <ListAltIcon className="icon" />
            <span>orders</span>
          </li> */}
          {/* <li>
            <LocalShippingOutlinedIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/*<p className="title">USEFULL LINKS</p>*/}
          <Link to="/statistics" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartOutlinedSharpIcon className="icon" />
              <span>Stats</span>
            </li>
          </Link>
          {/*
          <Link to="/notification" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneOutlinedIcon className="icon" />
              <span>Notification</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <li>
            <WysiwygIcon className="icon" />
            <span>System Health</span>
          </li>
        */}
          {/*
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Log out</span>
          </li>
      */}
        </ul>
      </div>
      {/* <div className="bottom"></div> */}
    </div>
  );
};

export default Sidebar;
