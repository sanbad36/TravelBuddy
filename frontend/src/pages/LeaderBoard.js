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

function createData(srno, avatar, name, points, badge, payment) {
  return { srno, avatar, name, points, badge, payment };
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
  createData("1", "RS", "Raj Sanghavi", "2100", "gold", "Bonus"),
  createData("2", "VP", "Vidhish Panchal", "2000", "gold", "Bonus"),
  createData("3", "AA", "Adnan Ahmed", "2000", "gold", "Bonus"),
  createData("4", "BS", "Burhan Sawliwala", "1800", "gold", "Bonus"),
  createData("5", "TA", "Thakur Avnod", "1700", "silver", "Bonus"),
  createData("6", "TR", "Tripur Rashi", "1600", "silver", "Bonus"),
  createData("7", "UV", "Urvashi Vaani", "1500", "silver", "Bonus"),
];
const LeaderBoard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleRazorpayResponse = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) => {
    if (razorpay_payment_id) {
      console.log("Successful");
      Swal.fire("Donation has been made successfully", `Amount: $}`, "success");
    } else {
      console.log("Unsuccessful");
    }
  };

  const displayRazorPay = async () => {
    console.log("Hello");
    const res = await loadRazorPay();

    if (!res) {
      alert("Razorpay SDK Failed. Please check your connection.");
      return;
    }

    const { data } = await axios.post("/donation/razorpay");

    // console.log(data);

    const options = {
      key: "rzp_test_vdRitP9HytsLLm", // Enter the Key ID generated from the Dashboard
      // amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // currency: "INR",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "BFB",
      description: "Test Transaction",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        handleRazorpayResponse(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      prefill: {
        name: "Raj",
        // name: userInfo.data.name,
        email: "raj@example.com",
        // email: userInfo.data.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#DC143C",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
                LeaderBoard
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
                          Points
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
                          Badge
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
                          Payment
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
                        <TableCell align="center">{row.points}</TableCell>
                        <TableCell align="center">
                          <Button style={{ backgroundColor: `${row.badge}` }}>
                            {row.badge}
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={displayRazorPay}
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

export default LeaderBoard;
