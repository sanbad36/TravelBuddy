import React, { useState, useEffect } from "react";
import { globalStyles } from "../../styles/global";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import { API_TOKEN } from "../../redux/constants";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import EventIcon from "@material-ui/icons/Event";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormLabel from "@mui/material/FormLabel";

const useStyles = makeStyles({
  tableRowBackground1: {
    backgroundColor: "whitesmoke",
  },
  tableRowBackground2: {
    backgroundColor: "white",
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const ViewWorkers = () => {
  const globalClasses = globalStyles();
  const classes = useStyles();
  //   const [freqTimingChart, setFreqTimingChart] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [business, setBusiness] = useState(null);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [vehicleIntervalDialog, setvehicleIntervalDialog] = useState(false);
  const [selectedVehicleDialog, setSelectedVehicleDialog] = useState({});
  const [allVehicleOptions, setAllVehicleOptions] = useState([]);
  const [businessOptions, setBusnessOptions] = useState([]);
  //   const [slotOptions, setSlotOptions] = useState([]);

  const [mainLoading, setMainLoading] = useState(false);
  const [listOfDrivers, setListOfDrivers] = useState([]);
  const [listOfAllVehiclesAndDrivers, setListOfAllVehiclesAndDrivers] =
    useState([]);
  const [listOfBranches, setlistOfBranches] = useState([]);
  const [listOfCities, setListOfCities] = useState([]);
  const [listOfDepots, setListOfDepots] = useState([]);
  const [listOfVehicles, setListOfVehicles] = useState([]);
  const [selectedVehicleTag, setSelectedVehicleTag] = useState("Select All");
  const [selectedBranch, setSelectedBranch] = useState("Select All");
  const [selectedCity, setSelectedCity] = useState("Select All");
  const [selectedDepot, setSelectedDepot] = useState("Select All");
  const [showDriverDetailsDialog, setShowDriverDetailsDialog] = useState(false);
  const [driverInDialog, setDriverInDialog] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [filteredListOfDrivers, setFilteredListOfDrivers] = useState([]);

  // useEffect(async () => {
  //   // Get the list of Drivers
  //   // const { data } = await axios.get("/driver/getDrivers", {
  //   //   headers,
  //   // });
  //   // console.log(data.data);
  //   // console.log(data.driverDatabaseData);

  //   let tempArr = [
  //     {
  //       label: "Select All",
  //       value: "Select All",
  //     },
  //   ];
  //   let len = data.driverDatabaseData.length;
  //   for (let i = 0; i < len; i++) {
  //     if (
  //       tempArr.filter(
  //         (value) =>
  //           value.label == data.driverDatabaseData[i].driverBranch &&
  //           value.value === data.driverDatabaseData[i].driverBranch
  //       ).length === 0
  //     ) {
  //       tempArr.push({
  //         label: data.driverDatabaseData[i].driverBranch,
  //         value: data.driverDatabaseData[i].driverBranch,
  //       });
  //     }
  //   }
  //   setlistOfBranches(tempArr);
  //   tempArr = [
  //     {
  //       label: "Select All",
  //       value: "Select All",
  //     },
  //   ];
  //   for (let i = 0; i < len; i++) {
  //     if (
  //       tempArr.filter(
  //         (value) =>
  //           value.label == data.driverDatabaseData[i].city &&
  //           value.value === data.driverDatabaseData[i].city
  //       ).length === 0
  //     ) {
  //       tempArr.push({
  //         label: data.driverDatabaseData[i].city,
  //         value: data.driverDatabaseData[i].city,
  //       });
  //     }
  //   }
  //   setListOfCities(tempArr);
  //   tempArr = [
  //     {
  //       label: "Select All",
  //       value: "Select All",
  //     },
  //   ];
  //   for (let i = 0; i < len; i++) {
  //     if (
  //       tempArr.filter(
  //         (value) =>
  //           value.label == data.driverDatabaseData[i].depot &&
  //           value.value === data.driverDatabaseData[i].depot
  //       ).length === 0
  //     ) {
  //       tempArr.push({
  //         label: data.driverDatabaseData[i].depot,
  //         value: data.driverDatabaseData[i].depot,
  //       });
  //     }
  //   }
  //   setListOfDepots(tempArr);
  //   tempArr = [];
  //   for (let i = 0; i < len; i++) {
  //     if (
  //       tempArr.filter(
  //         (value) =>
  //           value.label == data.driverDatabaseData[i].vehicleTag &&
  //           value.value === data.driverDatabaseData[i].vehicleTag
  //       ).length === 0
  //     ) {
  //       tempArr.push({
  //         label: data.driverDatabaseData[i].vehicleTag,
  //         value: data.driverDatabaseData[i].vehicleTag,
  //       });
  //     }
  //   }
  //   setListOfVehicles(tempArr);
  //   setListOfDrivers(data.driverDatabaseData);
  //   let tempArr2 = [];
  //   len = vehicles.length;
  //   for (let i = 0; i < len; i++) {
  //     if (
  //       data.driverDatabaseData.filter(
  //         (driver) => driver.vehicleTag === vehicles[i].vehicleUid
  //       ).length > 0
  //     ) {
  //       console.log(vehicles[i].vehicleUid);
  //     } else {
  //       tempArr2.push({ vehicleTag: vehicles[i].vehicleUid });
  //     }
  //   }
  //   setListOfAllVehiclesAndDrivers(tempArr2);
  //   setMainLoading(false);
  // }, []);

  return (
    <div className={globalClasses.container}>
      <h3 style={{ marginTop: "-28px", color: "black", marginBottom: "23px" }}>
        View Workers
      </h3>
      {mainLoading === true ? (
        <CircularProgress />
      ) : (
        <>
          <Grid
            container
            spacing={1}
            className={classes.filterContainer}
            style={{ marginTop: "30px" }}
          >
            <Grid item md={4} xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <Select
                  id="SelectVehicles"
                  options={allVehicleOptions}
                  // value={selectedVehicleIDs}
                  isMulti
                  placeholder="Select/Search Workers"
                  onChange={(e) => {
                    if (e) {
                      let tempArr = [];
                      let selectedOptions = [];
                      for (let vech of e) {
                        tempArr.push(vech.value);
                        selectedOptions.push(vech);
                      }
                      // setSelectedVehicle(tempArr);
                      // setSelectedVehicleIDs(selectedOptions);
                    } else {
                      // setSelectedVehicle([]);
                      // setSelectedVehicleIDs([]);
                    }
                    // console.log(selectedVehicle);
                    // setBusiness(null);
                  }}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={console.log("Hello")}
                    name="selectAllChecked"
                  />
                }
                label="Select All Workers"
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl variant="outlined" fullWidth>
                <Select
                  id="selectInterval"
                  onChange={(e) => {
                    console.log("Jello");
                  }}
                  options={listOfCities}
                  placeholder="City"
                />
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                className={globalClasses.assignButton}
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#8a2be2",
                }}
                onClick={console.log("Hello")}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="distance table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Worker Name</TableCell>
                  <TableCell align="left">Worker Mobile Number</TableCell>
                  <TableCell align="left">Worker City</TableCell>
                  <TableCell align="left">Supervisor Name</TableCell>
                  <TableCell align="right">View Full Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={`veh$}`}
                  className={
                    2 % 2
                      ? classes.tableRowBackground2
                      : classes.tableRowBackground1
                  }
                >
                  <TableCell component="th" scope="row">
                    {"Ramesh"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"987654321"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Mumbai"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Adnan Ahmed"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="start to end"
                      onClick={() => {
                        // setSelectedVehicleDialog(row.dateWiseKm);
                        // setvehicleIntervalDialog(true);
                        setShowDriverDetailsDialog(true);
                        // setDriverInDialog(row);
                      }}
                    >
                      <EventIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow
                  key={`veh$}`}
                  className={
                    1 % 2
                      ? classes.tableRowBackground2
                      : classes.tableRowBackground1
                  }
                >
                  <TableCell component="th" scope="row">
                    {"Suresh"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"123456789"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Pune"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Salman Khan"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="start to end"
                      onClick={() => {
                        // setSelectedVehicleDialog(row.dateWiseKm);
                        // setvehicleIntervalDialog(true);
                        setShowDriverDetailsDialog(true);
                        // setDriverInDialog(row);
                      }}
                    >
                      <EventIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow
                  key={`veh$}`}
                  className={
                    2 % 2
                      ? classes.tableRowBackground2
                      : classes.tableRowBackground1
                  }
                >
                  <TableCell component="th" scope="row">
                    {"Paresh"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"75684554"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Mumbai"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Shahrukh Khan"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="start to end"
                      onClick={() => {
                        // setSelectedVehicleDialog(row.dateWiseKm);
                        // setvehicleIntervalDialog(true);
                        setShowDriverDetailsDialog(true);
                        // setDriverInDialog(row);
                      }}
                    >
                      <EventIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow
                  key={`veh$}`}
                  className={
                    1 % 2
                      ? classes.tableRowBackground2
                      : classes.tableRowBackground1
                  }
                >
                  <TableCell component="th" scope="row">
                    {"Naresh"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"47239845794385"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Delhi"}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {"Azam Khan"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="start to end"
                      onClick={() => {
                        // setSelectedVehicleDialog(row.dateWiseKm);
                        // setvehicleIntervalDialog(true);
                        setShowDriverDetailsDialog(true);
                        // setDriverInDialog(row);
                      }}
                    >
                      <EventIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </>
      )}
    </div>
  );
};

export default ViewWorkers;
