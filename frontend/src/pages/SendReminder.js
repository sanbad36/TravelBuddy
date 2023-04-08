import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
// import Footer from "./Footer";
import Avatar from "@material-ui/core/Avatar";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

function createData(srno, avatar, name, payment) {
  return { srno, avatar, name, payment };
}

const loadRazorPay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    // script.onload = displayRazorPay;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const rows = [
  createData("1", "RS", "Raj Sanghavi", "Send Reminder Call"),
  createData("2", "VP", "Vidhish Panchal", "Send Reminder Call"),
  createData("3", "AA", "Adnan Ahmed", "Send Reminder Call"),
  createData("4", "BS", "Burhan Sawliwala", "Send Reminder Call"),
  createData("5", "TA", "Thakur Avnod", "Send Reminder Call"),
  createData("6", "TR", "Tripur Rashi", "Send Reminder Call"),
  createData("7", "UV", "Urvashi Vaani", "Send Reminder Call"),
];
const SendReminder = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handlePhoneCall = async () => {
    console.log("Phone call is being made");
    const { data } = await axios.post("/phoneCall/makePhoneCall");

    console.log(data);
  };

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div
            style={{
              backgroundColor: "#87d5fa",
              paddingTop: "20px",
              paddingBottom: "50px",
            }}
          >
            <div style={{ margin: "40px" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                Reminders
              </h1>
              <br />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Sr. No.
                        </h3>
                      </TableCell>
                      <TableCell align="right">
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Avatar
                        </h3>
                      </TableCell>
                      <TableCell align="right">
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Name
                        </h3>
                      </TableCell>

                      <TableCell align="right">
                        <h3
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Reminders
                        </h3>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.srno}>
                        <TableCell component="th" align="center" scope="row">
                          {row.srno}
                        </TableCell>
                        <TableCell align="right">
                          <Avatar>{row.avatar}</Avatar>
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>

                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={handlePhoneCall}
                          >
                            {row.payment}
                          </Button>
                        </TableCell>
                        {/* <TableCell align="center"><Link to="/event/particularEvent"><Button variant="contained" color="primary">{row.details}</Button></Link></TableCell> */}
                        {/* <TableCell align="center"><Button variant="contained" color="primary"><EmailIcon style={{ marginRight: "5px" }} />{row.certificate}</Button></TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendReminder;
