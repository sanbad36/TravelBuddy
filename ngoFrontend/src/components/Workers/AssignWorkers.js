import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { FormControl, Select, MenuItem, Button } from "@mui/material";
import Swal from "sweetalert2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const AssignWorkers = () => {
  // const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [organisationName, setorganisationName] = useState("");
  const [enrolledProgram, setenrolledProgram] = useState("");
  const [representerName, setrepresenterName] = useState("");
  const [representerDesignation, setrepresenterDesignation] = useState("");
  const [registeredID, setregisteredID] = useState(0);

  const [month, setmonth] = useState("");
  const [food, setfood] = useState(0);
  const [under, setunder] = useState(0);
  const [over, setover] = useState(0);
  const [females, setfemales] = useState(0);

  const [total, settotal] = useState(0);

  const [location, setlocation] = useState("");
  const [partnerOrganisation, setpartnerOrganisation] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  const [showCsvUploadOption, setShowCsvUploadOption] = useState(false);

  const handleAssignDriver = async (e) => {
    e.preventDefault();
    // const mobileNumber = Number(driverMobileNumber);

    Swal.fire({
      title: `Confirm adding details`,
      text: `Adding details to database`,
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
          // assignDriver
          const body = {
            organisationName,
            enrolledProgram,
            representerName,
            representerDesignation,
            registeredID,
            month,
            food,
            under,
            over,
            females,
            total,
            location,
            partnerOrganisation,
          };
          Swal.fire("Details has been saved!", `Successful`, "success");
        } catch (err) {
          Swal.fire(`Details cannot be saved`, `Please check again.`, "error");
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
      "organisationName",
      "enrolledProgram",
      "representerName",
      "representerDesignation",
      "registeredID",
      "month",
      "food",
      "under",
      "over",
      "females",
      "total",
      "location",
      "partnerOrganisation",
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
    console.log(newArray);
    // console.log(newArray);
    let isErrorInCsvFile = false;
    let allAssigned = true;
    if (isErrorInCsvFile === false) {
      let allAssigned = true;
      newArray.map(async (row) => {
        if (
          row.organisationName === undefined &&
          row.enrolledProgram === undefined &&
          row.representerName === undefined &&
          row.representerDesignation === undefined &&
          row.registeredID === undefined &&
          row.month === undefined &&
          row.month === undefined &&
          row.food === undefined &&
          row.under === undefined &&
          row.over === undefined &&
          row.females === undefined &&
          row.total === undefined &&
          row.location === undefined &&
          row.partnerOrganisation === undefined
        ) {
          console.log(row);
        } else {
          try {
            const headers = {
              "Content-Type": "application/json",
              // "x-auth-token": localStorage.getItem(API_TOKEN),
            };
            // assignDriver
            const body = {
              organisationName: row.organisationName,
              enrolledProgram: row.enrolledProgram,
              representerName: row.representerName,
              representerDesignation: row.representerDesignation,
              registeredID: row.registeredID,
              month: row.month,
              food: row.food,
              under: row.under,
              over: row.over,
              females: row.females,
              total: row.total,
              location: row.location,
              partnerOrganisation: row.partnerOrganisation,
            };
            console.log(body);
            const { data } = await axios.post("/enrollment/assign", body, {
              headers,
            });
            if (data.success === true) {
              console.log("Success");
            } else {
              console.log("Success=true not returned");
              allAssigned = false;
            }
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
            console.log("Error in Adding Data", err);
          }
        }
      });
      setTimeout(function () {
        if (allAssigned === true) {
          Swal.fire(
            "Data has been added!",
            `For all the organisations`,
            "success"
          );
        } else {
          Swal.fire(`Error in adding data`, `Check data again`, "error");
        }
        document.getElementById("csvFile").value = "";
        setCsvFile("");
        setShowLoading(false);
      }, 3000);
    }
    setTimeout(function () {
      if (allAssigned === true) {
        Swal.fire(
          "Details have been added",
          `For all the organisations`,
          "success"
        );
      } else {
        Swal.fire(`Error in assigning drivers`, `Check again`, "error");
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
    // <div className="driverPage">
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ color: "black" }}>
          <h3>Add Data</h3>
        </FormLabel>
        <RadioGroup
          aria-label="analysis"
          defaultValue="total"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="total"
            control={<Radio />}
            label="Enter Details"
            onChange={(e) => {
              setShowCsvUploadOption(false);
            }}
          />
          <FormControlLabel
            value="tomeSlots"
            control={<Radio />}
            label="Upload CSV File"
            onChange={(e) => setShowCsvUploadOption(true)}
          />
        </RadioGroup>
      </FormControl>
      <br />

      {showCsvUploadOption === false ? (
        <FormControl style={{ width: "800px" }}>
          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Organisation Name {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="organisationName"
            variant="outlined"
            required
            placeholder="Enter Organisation Name"
            onChange={(e) => {
              setorganisationName(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Enrolled Program {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="enrolledProgram"
            variant="outlined"
            required
            placeholder="Enter Enrolled Program"
            onChange={(e) => {
              setenrolledProgram(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Representer Name {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="representerName"
            variant="outlined"
            required
            placeholder="Enter Representer Name"
            onChange={(e) => {
              setrepresenterName(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Registered ID {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="registeredID"
            variant="outlined"
            required
            placeholder="Enter Registered ID"
            onChange={(e) => {
              setregisteredID(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Month {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="month"
            variant="outlined"
            required
            placeholder="Enter month"
            onChange={(e) => {
              setmonth(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Food {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="food"
            variant="outlined"
            required
            placeholder="Enter amount of food"
            onChange={(e) => {
              setfood(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Beneficiaries under 18 {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="under"
            variant="outlined"
            required
            placeholder="Enter Beneficiaries under 18"
            onChange={(e) => {
              setunder(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Beneficiaries over 60 {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="over"
            variant="outlined"
            required
            placeholder="Enter Beneficiaries over 60"
            onChange={(e) => {
              setover(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Number of female Beneficiaries {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="females"
            variant="outlined"
            required
            placeholder="Enter Number of female Beneficiaries"
            onChange={(e) => {
              setfemales(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Number of total Beneficiaries {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="total"
            variant="outlined"
            required
            placeholder="Enter Number of total Beneficiaries"
            onChange={(e) => {
              settotal(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Location {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="location"
            variant="outlined"
            required
            placeholder="Enter Location"
            onChange={(e) => {
              setlocation(e.target.value);
            }}
          />

          <span
            style={{
              marginTop: "25px",
              marginLeft: "7px",
              marginBottom: "15px",
            }}
          >
            Partner Organisation {"  "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </span>
          <TextField
            className="partnerOrganisation"
            variant="outlined"
            required
            placeholder="Enter Partner Organisation"
            onChange={(e) => {
              setpartnerOrganisation(e.target.value);
            }}
          />

          {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}

          <span>
            <Button
              variant="contained"
              onClick={handleAssignDriver}
              style={{
                position: "relative",
                maxWidth: 300,
                marginTop: 40,
                marginBottom: 40,
                color: "white",
                backgroundColor: "#8a2be2",
              }}
            >
              Add details
            </Button>
            {showLoading && (
              <CircularProgress
                style={{ marginLeft: "20px", height: "30px", width: "30px" }}
              />
            )}
          </span>
        </FormControl>
      ) : (
        <form id="csv-form">
          <input
            type="file"
            accept=".csv"
            id="csvFile"
            onChange={(e) => {
              setCsvFile(e.target.files[0]);
            }}
            style={{ marginTop: "30px" }}
            ref={(ref) => null}
          ></input>
          <br />
          <span>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                if (csvFile) {
                  submit();
                  setShowLoading(true);
                }
              }}
              style={{
                position: "relative",
                maxWidth: 300,
                marginTop: "30px",
                marginBottom: 40,
                color: "black",
                backgroundColor: "#8a2be2",
              }}
            >
              Submit
            </Button>
            {showLoading && (
              <CircularProgress
                style={{ marginLeft: "20px", height: "30px", width: "30px" }}
              />
            )}
          </span>
          <br />
          <br />
        </form>
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   vehicles: state.admin.vehicles,
// });

// export default connect(mapStateToProps, {})(Drivers);

export default AssignWorkers;
