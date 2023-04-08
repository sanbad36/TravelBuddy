import React from "react";
import "./widgets.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import ClassIcon from "@mui/icons-material/Class";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const Widgets = ({ type }) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "WORKERS",
        count: false,
        link: "see all",
        icon: (
          <AccountCircleOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
      case "userhindi":
        data = {
          title: "उपयोगकर्ताओं",
          count: false,
          link: "सभी उपयोगकर्ताओं को देखें",
          icon: (
            <AccountCircleOutlinedIcon
              className="icon"
              style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
            />
          ),
        };
        break;
    case "blogs":
      data = {
        title: "PROJECTS",
        count: true,
        link: "see al",
        icon: (
          <BackupTableIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
      case "blogshindi":
        data = {
          title: "परियोजनाओं",
          count: true,
          link: "see all blogs",
          icon: (
            <BackupTableIcon
              className="icon"
              style={{ color: "green", backgroundColor: "rgba(255,0,0,0.2)" }}
            />
          ),
        };
        break;
    case "categories":
      data = {
        title: "FUNDS",
        count: false,
        link: "see all",
        icon: (
          <ClassIcon
            className="icon"
            style={{ color: "orange", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
      case "categorieshindi":
      data = {
        title: "श्रेणी",
        count: false,
        link: "सभी श्रेणी देखें",
        icon: (
          <ClassIcon
            className="icon"
            style={{ color: "orange", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "viewership":
      data = {
        title: "FUNDS",
        count: true,
        link: "see all",
        icon: (
          <QueryStatsIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
      case "viewershiphindi":
      data = {
        title: "दर्शकों की संख्या",
        count: true,
        link: "सभी व्यूअरशिप देखें",
        icon: (
          <QueryStatsIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ExpandLessIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
