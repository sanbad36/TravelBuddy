import React, { useEffect } from "react";
import "./list.scss";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@mui/material/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const List = (props) => {
  let rows = [];

  rows = props.program1Details;
  useEffect(() => {
    console.log(props.program1Details);
    props.program1Details.map((res) => {
      rows.push(res);
    });
    console.log(rows);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [food, setfood] = React.useState("");
  const [females, setfemales] = React.useState("");
  const [total, settotal] = React.useState("");
  const [under, setunder] = React.useState("");
  const [over, setover] = React.useState("");

  // const rows = [
  //   {
  //     id: 121212,
  //     title: " Hello there",
  //     img: "https://images.pexels.com/photos/518895/pexels-photo-518895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     author: "Jack",
  //     date: "1 March",
  //     tags: "nature, black",
  //     status: "Pending",
  //   },
  //   {
  //     id: 121212,
  //     title: " Hello there",
  //     img: "https://images.pexels.com/photos/518895/pexels-photo-518895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     author: "Jack",
  //     date: "1 March",
  //     tags: "nature, black",
  //     status: "Approved",
  //   },
  //   {
  //     id: 121212,
  //     title: " Hello there",
  //     img: "https://images.pexels.com/photos/518895/pexels-photo-518895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     author: "Jack",
  //     date: "1 March",
  //     tags: "nature, black",
  //     status: "Approved",
  //   },
  //   {
  //     id: 121212,
  //     title: " Hello there",
  //     img: "https://images.pexels.com/photos/518895/pexels-photo-518895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     author: "Jack",
  //     date: "1 March",
  //     tags: "nature, black",
  //     status: "Approved",
  //   },
  //   {
  //     id: 121212,
  //     title:
  //       " Hello theresnflmsdlfnlsdnfknsdfkjnsdkjfnksndfkndkfndknknknknknknknknknknknknknknknknknknknknknknksdfhkjsdfkjsndfkjbsdkjfbkjsdbfksbdfkjbsdkjfbsdhfbdsfvhsdfdsbjhnknknknknknjxndvlnsdkvnkldsnfksdnfnsdfnk",
  //     img: "https://images.pexels.com/photos/518895/pexels-photo-518895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     author: "Jack",
  //     date: "1 March",
  //     tags: "nature, black",
  //     status: "Pending",
  //   },
  // ];
  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tablecell">NGO ID</TableCell>
              <TableCell className="tablecell">title</TableCell>
              <TableCell className="tablecell">Verification Status</TableCell>
              {/*<TableCell className="tablecell">Date</TableCell>*/}
              <TableCell className="tablecell">Representative</TableCell>
              <TableCell className="tablecell"> </TableCell>
              <TableCell className="tablecell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 10).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                {/*
              <TableCell className="tablecell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.title.slice(0, 30)}..
                </div>
              </TableCell>
          */}
                <TableCell className="tablecell">{row.author}</TableCell>
                {/* <TableCell className="tablecell">{row.date}</TableCell>*/}
                <TableCell className="tablecell">
                  <span className={`status ${row.status}`}>{row.status}</span>{" "}
                </TableCell>
                <TableCell className="tablecell">
                  <span className={`status ${row.tags}`}>{row.tags}</span>{" "}
                </TableCell>
                <TableCell className="tablecell">
                  <span className={" "}> </span>{" "}
                </TableCell>
                <TableCell className="tablecell">
                  {
                    <Button
                      size="small"
                      variant="contained"
                      style={{ backgroundColor: "#ffdcdc", color: "red" }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Modify
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Modify Details:</h3>
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                style={{ color: "black" }}
                id="outlined-basic"
              ></InputLabel>
              <TextField
                id="textfield"
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%" }}
                value={"Enter Amount of Food in kgs"}
                onChange={(e) => {
                  setfood(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                style={{ color: "black" }}
                id="outlined-basic"
              ></InputLabel>
              <TextField
                id="textfield"
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%" }}
                value={"Enter No. Of female beneficiaries"}
                onChange={(e) => {
                  setfemales(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                style={{ color: "black" }}
                id="outlined-basic"
              ></InputLabel>
              <TextField
                id="textfield"
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%" }}
                value={"Enter total No. of Beneficiaries"}
                onChange={(e) => {
                  settotal(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                style={{ color: "black" }}
                id="outlined-basic"
              ></InputLabel>
              <TextField
                id="textfield"
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%" }}
                value={"Enter Beneficiaries under the age of 18"}
                onChange={(e) => {
                  setunder(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel
                style={{ color: "black" }}
                id="outlined-basic"
              ></InputLabel>
              <TextField
                id="textfield"
                variant="outlined"
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%" }}
                value={"Enter Beneficiaries above the age of 60"}
                onChange={(e) => {
                  setover(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: "#00FF00", color: "black" }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: "#FF0000", color: "black" }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default List;
