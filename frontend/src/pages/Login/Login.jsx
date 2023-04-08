import React, { useState } from "react";
import "./login.scss";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import AccountCircle from "@mui/icons-material/AccountCircle";
const Login = () => {
  const [file, setFile] = useState("");
  return (
    <div className="login">
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img
              src="https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
            />
            <div className="text">
              <span className="text-1"></span>
              <span className="text-2"></span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" alt="" />
            <div className="text">
              <span className="text-1"></span>
              <span className="text-2"> </span>
            </div>
          </div>
        </div>
        <form action="#">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <div className="input-boxes">
                <div className="input_box">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon sx={{ color: "#7d2ae8", mr: 2, my: 0.5 }} />
                    <TextField
                      id="Email"
                      label="Email"
                      variant="standard"
                      className="input_field"
                    />
                  </Box>
                </div>
                <div className="input_box">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PasswordIcon sx={{ color: "#7d2ae8", mr: 2, my: 0.5 }} />
                    <TextField
                      label="Password"
                      type="password"
                      variant="standard"
                      autoComplete="current-password"
                      className="input_field"
                    />
                  </Box>
                </div>
                <div className="text_FP">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="input_box">
                  <Button variant="contained" type="Submit">
                    Submit{" "}
                  </Button>
                </div>
                <div className="text sign-up-text">
                  Don't have an account? <label for="flip">Signup now </label>
                </div>
              </div>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <div className="formInput">
                <label htmlFor="file">
                  Upload Image:
                  <UploadFileIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="input-boxes">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://images.pexels.com/photos/9289070/pexels-photo-9289070.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  alt=""
                  className="img_avatar"
                />
                <div className="input_box">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PersonIcon sx={{ color: "#7d2ae8", mr: 2, my: 0.5 }} />
                    <TextField
                      id="Username"
                      label="username"
                      variant="standard"
                      className="input_field"
                    />
                  </Box>
                </div>
                <div className="input_box">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon sx={{ color: "#7d2ae8", mr: 2, my: 0.5 }} />
                    <TextField
                      id="Email"
                      label="Email"
                      variant="standard"
                      className="input_field"
                    />
                  </Box>
                </div>
                <div className="input_box">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PasswordIcon sx={{ color: "#7d2ae8", mr: 2, my: 0.5 }} />
                    <TextField
                      label="Password"
                      type="password"
                      variant="standard"
                      autoComplete="current-password"
                      className="input_field"
                    />
                  </Box>
                </div>

                <div className="input_box">
                  <Button variant="contained" type="Submit">
                    Submit{" "}
                  </Button>
                </div>
                <div className="text sign-up-text">
                  Already have an account? <label for="flip">Signin </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
