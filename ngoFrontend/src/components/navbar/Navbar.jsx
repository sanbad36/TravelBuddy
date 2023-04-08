import React, {useState} from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const Navbar = () => {
  const [lang, setLang] = useState('');

  const handleChange = (e) => {
    setLang(e.target.value);
  }
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search" style={{position:"relative", bottom:"32px"}}>
          <input type="text" placeholder="search..." />
          <SearchIcon />
        </div>
        
        <div className="items">
        <Box sx={{ minWidth: 120, marginRight:"10px" }}>
      <FormControl fullWidth style={{position:"relative", bottom:"35px"}}>
        <InputLabel id="demo-simple-select-label">🌐</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Lang"
          onChange={handleChange}
        >
          <MenuItem value={10} onClick={()=>navigate("/")}>English</MenuItem>
          <br />
          <MenuItem value={10} onClick={()=>navigate("/hin")}>हिन्दी</MenuItem>
         
        </Select>
      </FormControl>
    </Box>
          <div className="item" style={{position:"relative", bottom:"35px"}}>
            <ExitToAppIcon className="icon" />
          </div>
          <div className="item" style={{position:"relative", bottom:"35px"}}>
            <NotificationAddIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item" style={{position:"relative", bottom:"35px"}}>
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
