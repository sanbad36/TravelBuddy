import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import axios from "axios";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { styled } from "@mui/material/styles";
import AssignWorkers from "./AssignWorkers";
import ViewWorkers from "./ViewWorkers";
import UnassignWorkers from "./UnassignWorkers";
import Home from "../../pages/Home/Home";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: black;
  font-size:100px;
  &.Mui-selected {
    color: #8a2be2;
  }
`);

const Workers = () => {
  // const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [textVal, setTextVal] = useState("");
  const [dataFetch, setDataFetch] = useState(true);

  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [driverEmailID, setDriverEmailID] = useState("");
  const [driverMobileNumber, setDriverMobileNumber] = useState(0);
  const [depot, setDepot] = useState("");
  const [driverID, setDriverID] = useState("");
  const [driverBranch, setDriverBranch] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [vehicleTag, setVehicleTag] = useState("NA");
  const [batteryTag, setBatteryTag] = useState("");

  // const vehicles = useSelector((state) => state.admin.vehicles);
  // const currentAdmin = useSelector((state) => state.admin.currentAdmin);
  // const assignedBy = currentAdmin.fullName;

  const [selectAll, setSelectAll] = useState(false);

  // const [selectedVehicle, setSelectedVehicle] = useState([]);
  // const [selectedVehicleID, setSelectedVehicleID] = useState("NA");
  // const [allVehicleOptions, setAllVehicleOptions] = useState([]);

  const [showCsvUploadOption, setShowCsvUploadOption] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  const [viewMode, setViewMode] = React.useState(0);

  // console.log("Vehicles = ");
  // console.log(vehicles);
  // useEffect(() => {
  //   let unmount = false;
  //   let tempArr = [];
  //   let len = vehicles.length;
  //   // console.log(vehicles);
  //   for (let i = 0; i < len && unmount == false; i++) {
  //     tempArr.push({
  //       label: vehicles[i].vehicleUid,
  //       value: vehicles[i].vehicleSclId,
  //       vehicleTag: vehicles[i].vehicleUid,
  //     });
  //     // tempArr.push(vehicles[i].vehicleUid);
  //   }
  //   setAllVehicleOptions(tempArr);
  //   // console.log("All vehicles = " + allVehicleOptions);
  //   // if (allVehicleOptions.length > 0) {
  //   //   setSelectedVehicleID(allVehicleOptions[0].label);
  //   // }
  //   return () => {
  //     unmount = true;
  //   };
  // }, [vehicles]);

  // useEffect(() => {
  //   if (selectedVehicle.length == vehicles.length) {
  //     if (vehicles.length != 0) {
  //       setSelectAll(true);
  //     }
  //   } else {
  //     setSelectAll(false);
  //   }
  // }, [selectedVehicle]);

  const handleAssignDriver = async (e) => {
    e.preventDefault();
    // const mobileNumber = Number(driverMobileNumber);
    // console.log({
    //   driverFirstName,
    //   driverLastName,
    //   driverID,
    //   driverEmailID,
    //   assetUID: selectedVehicleID,
    //   vehicleTag,
    //   batteryTag,
    //   assignedBy,
    //   depot,
    //   driverMobileNumber: mobileNumber,
    //   driverBranch,
    //   address,
    //   city,
    // });

    Swal.fire({
      title: `Confirm Assigning Worker to Andheri Project?`,
      text: `Worker Name: Ramlal Sharma`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8a2be2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      setShowLoading(true);
      if (result.isConfirmed) {
        try {
          Swal.fire(
            "Driver has been assigned!",
            `Vehicle Tag: ${vehicleTag}`,
            "success"
          );
          // if (data.success === true) {
          //   Swal.fire(
          //     "Driver has been assigned!",
          //     `Vehicle Tag: ${vehicleTag}`,
          //     "success"
          //   );
          // } else {
          //   if (data.statusCode === 404) {
          //     Swal.showValidationMessage(
          //       `Admin does not exist. Please login again`
          //     );
          //   } else if (data.statusCode === 400) {
          //     Swal.showValidationMessage(
          //       `Driver already assigned for vehicle: ${vehicleTag}. Please unassign the driver first.`
          //     );
          //   } else if (data.statusCode === 500) {
          //     Swal.showValidationMessage(`Server Error. Please try again.`);
          //   }

          //   console.log("Success=true not returned");
          // }
        } catch (err) {
          // alert("Error");
          // if (err.response.status === 404) {
          //   Swal.fire(`Admin does not exist.`, `Please login again.`, "error");
          // } else if (err.response.status === 400) {
          //   Swal.fire(
          //     `Driver already assigned for vehicle: ${vehicleTag}`,
          //     `Please unassign the driver first.`,
          //     "error"
          //   );
          // } else if (err.response.status === 500) {
          //   Swal.fire(`Server Error`, `Please try again.`, "error");
          // }
          Swal.fire(`Server Error`, `Please try again.`, "error");
          console.log("Error in Assigning Worker", err);
        }
      }
      setShowLoading(false);
    });
  };

  // CSV ARRAY
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  // [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

  const processCSV = async (str, delim = ",") => {
    // console.log(str);
    // const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const headers = [
      "workerFirstName",
      "workerLastName",
      "workerMobileNumber",
      "address",
      "city",
      "assignedBy",
    ];
    const newArray = rows.map((row) => {
      const values = row.split(delim);
      // console.log(headers);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
    // console.log(newArray);
    let isErrorInCsvFile = false;
    let allAssigned = true;
    newArray.map(async (row) => {
      try {
        // assignDriver
        const body = {
          workerFirstName: row.workerFirstName,
          workerLastName: row.workerLastName,
          driverMobileNumber: Number(row.driverMobileNumber),
          address: row.address,
          workerEmailID: row.workerEmailID,
          city: row.city,
          assignedBy: row.assignedBy,
        };
        // console.log(body);
        // const { data } = await axios.post("/driver/assignDriver", body, {
        //   headers,
        // });
        // if (data.success === true) {
        //   console.log("Success");
        // } else {
        //   console.log("Success=true not returned");
        //   allAssigned = false;
        // }
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          console.log("Error 404", err);
        } else if (err.response.status === 400) {
          console.log("Error 400", err);
        } else if (err.response.status === 500) {
          console.log("Error 500", err);
        }
        allAssigned = false;
        console.log("Error in Assigning Driver", err);
      }
    });
    setTimeout(function () {
      if (allAssigned === true) {
        Swal.fire(
          "Workers have been assigned!",
          `All the workers have been assigned`,
          "success"
        );
      } else {
        Swal.fire(`Error in assigning workers`, `Check again`, "error");
      }
      document.getElementById("csvFile").value = "";
      setCsvFile("");
      setShowLoading(false);
    }, 3000);
  };

  const submit = async () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };
    // setCsvFile();
    reader.readAsText(file);
  };

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="driverPage">
            {/* <form onSubmit={(e) => e.preventDefault()}> */}

            <Box sx={{ width: 500, margin: "auto" }}>
              <BottomNavigation
                showLabels
                value={viewMode}
                onChange={(event, newValue) => {
                  setViewMode(newValue);
                  console.log(newValue);
                }}
                sx={{
                  // fontSize: "300px",
                  height: 100,
                  marginBottom: "20px",
                }}
              >
                <BottomNavigationAction
                  label="Assign Workers"
                  icon={<AddCircleOutlineIcon />}
                />
                <BottomNavigationAction
                  label="View Workers"
                  icon={<PeopleAltIcon />}
                />
                <BottomNavigationAction
                  label="Unassign Workers"
                  icon={<PersonRemoveAlt1Icon />}
                />
              </BottomNavigation>
            </Box>

            {viewMode === 0 ? (
              <AssignWorkers />
            ) : viewMode === 1 ? (
              <ViewWorkers />
            ) : (
              // <h3>Unassign Drivers</h3>
              <UnassignWorkers />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workers;
