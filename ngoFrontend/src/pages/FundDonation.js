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
import { Card } from "@mui/material";
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
  createData("1", "RS", "Raj Sanghavi", "2100", "gold", "Payment"),
  createData("2", "VP", "Vidhish Panchal", "2000", "gold", "Payment"),
  createData("3", "AA", "Adnan Ahmed", "2000", "gold", "Payment"),
  createData("4", "BS", "Burhan Sawliwala", "1800", "gold", "Payment"),
  createData("5", "TA", "Thakur Avnod", "1700", "silver", "Payment"),
  createData("6", "TR", "Tripur Rashi", "1600", "silver", "Payment"),
  createData("7", "UV", "Urvashi Vaani", "1500", "silver", "Payment"),
];
const FundDonation = () => {
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
      name: "Construction Buddy",
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
              <h1>Donation for Workers' kids</h1>
              <br />
              <Card>
                <div style={{ margin: "10px" }}>
                  <br />
                  <h1>SunView Heights</h1>
                  <h4 style={{ textAlign: "left", marginLeft: "40px" }}>
                    About :{" "}
                  </h4>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      width: "40%",
                    }}
                  >
                    This is a project based in Andheri East, Mumbai. It is a
                    scyscraper, with more than 80 floors. It is a very big
                    project.
                  </p>
                  <img
                    style={{
                      width: "30%",
                      borderRadius: "30px",
                      boxShadow: "5px 5px 25px 5px grey",
                      float: "right",
                      position: "relative",
                      bottom: "90px",
                      right: "100px",
                    }}
                    src="https://media.istockphoto.com/photos/delivering-quality-construction-for-a-quality-lifestyle-picture-id1297780288?b=1&k=20&m=1297780288&s=170667a&w=0&h=NDdDs9BBGULLwYUDUt1AjIOroHuwmFY9N6ZEDAYV7sE="
                    alt="img"
                  />
                </div>
                <h4 style={{ textAlign: "left", marginLeft: "48px" }}>
                  Location : Andheri East
                </h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    right: "200px",
                  }}
                  onClick={displayRazorPay}
                >
                  Pay Amount
                </Button>
              </Card>

              <br />
              <Card>
                <div style={{ margin: "10px" }}>
                  <br />
                  <h1>Ganji Niwas</h1>
                  <h4 style={{ textAlign: "left", marginLeft: "40px" }}>
                    About :{" "}
                  </h4>
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      width: "40%",
                    }}
                  >
                    This is a project based in Andheri East, Mumbai. It is a
                    scyscraper, with more than 80 floors. It is a very big
                    project.
                  </p>
                  <img
                    style={{
                      width: "30%",
                      borderRadius: "30px",
                      boxShadow: "5px 5px 25px 5px grey",
                      float: "right",
                      position: "relative",
                      bottom: "90px",
                      right: "100px",
                    }}
                    src="https://media.istockphoto.com/photos/delivering-quality-construction-for-a-quality-lifestyle-picture-id1297780288?b=1&k=20&m=1297780288&s=170667a&w=0&h=NDdDs9BBGULLwYUDUt1AjIOroHuwmFY9N6ZEDAYV7sE="
                    alt="img"
                  />
                </div>
                <h4 style={{ textAlign: "left", marginLeft: "48px" }}>
                  Location : Andheri East
                </h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    textAlign: "left",
                    position: "relative",
                    right: "200px",
                  }}
                >
                  Pay Amount
                </Button>
              </Card>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FundDonation;
