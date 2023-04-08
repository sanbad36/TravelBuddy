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

export const projectColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    field: "name",
    headerName: "Project",
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
    headerName: "Send Report",
    width: 200,
    renderCell: (params) => {
      return (
        // <div className={`cellwithstatus ${params.row.status} `}>
        //   {params.row.status}
        // </div>.
        <Button variant="contained" onClick={handleSendReport}>
          Send Voucher
        </Button>
      );
    },
  },
];
export const projectRows = [
  {
    id: 1,
    name: "Sunview Heights",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "active",
    location: "Andheri West, Mumbai",
    time: new Date(),
  },
  {
    id: 2,
    name: "Ganji Nivaas",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "pending",
    location: "Thane, Mumbai",
    time: new Date(),
  },
  {
    id: 3,
    name: "Niles Apartments",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "passive",
    location: "Sagarcity, Pune",
    time: new Date(),
  },
  {
    id: 4,
    name: "Caribbean B",
    img: "https://images.pexels.com/photos/10283734/pexels-photo-10283734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "passive",
    location: "Vile Parle, Mumbai",
    time: new Date(),
  },
];
