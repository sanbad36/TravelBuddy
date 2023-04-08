import React, { useState, useEffect } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const Navbar = () => {
  const [lang, setLang] = useState("");
  const location = useLocation();

  const [counter, setCounter] = useState(0);

  const googleTranslateElementInit = () => {
    if (counter == 0) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (counter === 0) {
      var addScript = document.createElement("script");
      addScript.setAttribute("type", "text/javascript");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
    setCounter((prev) => prev + 1);
  }, [location, counter]);

  const handleChange = (e) => {
    setLang(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div
          className="search"
          style={{ position: "relative", bottom: "32px" }}
        >
          <input type="text" placeholder="search..." />
          <SearchIcon />
        </div>

        <div className="items">
          <div
            id="google_translate_element"
            style={{ marginTop: "-40px", marginRight: "10px" }}
          ></div>
          <div
            className="item"
            style={{ position: "relative", bottom: "35px" }}
          >
            <ExitToAppIcon className="icon" />
          </div>
          <div
            className="item"
            style={{ position: "relative", bottom: "35px" }}
          >
            <NotificationAddIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div
            className="item"
            style={{ position: "relative", bottom: "35px" }}
          >
            <img
              src="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className="avatar"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
