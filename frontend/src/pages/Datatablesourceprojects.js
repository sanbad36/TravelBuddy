import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

const handleSendReport = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  // assignDriver
  const body = {
    emailString: "rajsanghavi9@gmail.com",
  };
  const { data } = await axios.post("/phoneCall/sendProgressReport", body, {
    headers,
  });
  console.log(data);
  if (data.success === true) {
    console.log("Success");
    // setShowLoader(false);
    Swal.fire("Progress Email Report is sent", `Successful`, "success");
  } else {
    console.log("Success=true not returned");
    // setShowLoader(false);
    Swal.fire(
      `Progress Email Report could not be sent`,
      `Please try again.`,
      "error"
    );
  }
};

const sendCertificate = async (e) => {
  e.preventDefault();

  // const { name, domain, date1, date2, email } = user;
  const res = await fetch("http://localhost:8080/sendCertificate", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Raj",
      email: "rajsanghavi9@gmail.com",
      event: "Best Picture Contest",
      date: "1st April 2023",
    }),
  });
  const data = await res.json();
  if (data.status === 500 || !data) {
    window.alert(
      "Unsuccessful. Some error occured. Did you fill all the details?"
    );
    console.log(
      "Unsuccessful. Some error occured. Did you fill all the details?"
    );
  } else {
    window.alert("Successfully sent the mail to the recipient");
    console.log("Successfully sent the mail to the recipient");
    // navigate("/");
  }
};

export const projectColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    field: "name",
    headerName: "User Name",
    width: 280,
    renderCell: (params) => {
      return (
        <div className="cellwithimg">
          <img className="cellimg" src={params.row.img} alt="avatar" />
          {params.row.username}
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    field: "location",
    headerName: "Address",
    width: 280,
  },
  {
    field: "status",
    headerName: "Send Voucher",
    width: 200,
    renderCell: (params) => {
      return (
        // <div className={`cellwithstatus ${params.row.status} `}>
        //   {params.row.status}
        // </div>.
        // <Button variant="contained" onClick={handleSendReport}>
        <Button variant="contained" onClick={sendCertificate}>
          Send Voucher
        </Button>
      );
    },
  },
];
export const projectRows = [
  {
    id: 1,
    name: "User 1",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "active",
    location: "Andheri West, Mumbai",
    time: new Date(),
  },
  {
    id: 2,
    name: "User 2",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "pending",
    location: "Thane, Mumbai",
    time: new Date(),
  },
  {
    id: 3,
    name: "User 3",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "passive",
    location: "Sagarcity, Pune",
    time: new Date(),
  },
  {
    id: 4,
    name: "User 4",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "passive",
    location: "Vile Parle, Mumbai",
    time: new Date(),
  },
];
