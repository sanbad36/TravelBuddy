import React, { useEffect, useState } from "react";
import {
  IconButton,
  Container,
  Card,
  Avatar,
  CardHeader,
  CardActions,
  Collapse,
  CardContent,
  Typography,
  Button,
  Modal,
  Paper,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";

import SingleLineImageList from "./ImageRenderer";

import { attendaceData } from "./data";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const styles = makeStyles((theme) => ({
  bar: {
    marginTop: "70px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 100%)",
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  card: {
    border: "2px solid #C8C6C6",
    padding: "10px !important",
    margin: "20px 100px 0px 100px",
    borderRadius: "10px",
  },
  add: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    fontSize: "large",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    alignContent: "center",
    width: "50%",
    padding: "10px",
  },
  post: {
    marginTop: "10px",
  },
}));

export default function () {
  const classes = styles();
  // console.log("userInfo",userLogin)
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState(null);

  // const questions = [{ 'profile': { 'profilePicture': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'datePosted': 'September 21, 2021', 'question': 'When will I get it back?', 'answers': [{ 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }, { 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }] },
  // { 'profile': { 'profilePicture': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'datePosted': 'September 21, 2021', 'question': 'How do i do the assignment?', 'answers': [{ 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }, { 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }] },
  // { 'profile': { 'profilePicture': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'datePosted': 'September 21, 2021', 'question': 'How do i do the assignment? When will I get it backvuirnuienruincuw wjnbciuwbi uwefbyb iuwbefub', 'answers': [{ 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }, { 'name': 'Rohit', 'datePosted': 'September 22, 2021', 'answer': 'By typing it' }] }]
  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  useEffect(() => {
    setQuestions(attendaceData);
    // console.log(data);
  }, [questions]);

  const [filter, setFilter] = useState("");

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handlePostQuestion = () => {
    // submitQuestion();
  };

  function verifyAttendance(profile) {
    setQuestions((q) =>
      q.map((each) => {
        // console.log(each);
        let temp = each;
        if (each && each.name === profile.name) {
          temp.workVerified = true;
        }
        return temp;
      })
    );
  }

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          {questions.map((question, index) => {
            const profile = question;
            return (
              <Card key={index} className={classes.card}>
                <CardHeader
                  //   avatar={<Avatar style={{marginLeft: ""}} src={profile.img} />}
                  title={profile.name}
                  //   subheader={question.date}
                />
                <CardContent style={{ padding: "0px" }}>
                  <Grid container spacing={2} style={{ marginLeft: "140px" }}>
                    <Grid item xs={9} md={9}>
                      {/* <Typography variant="h6" color="textSecondary">
                        Department: {profile.workDescription}
                      </Typography> */}
                      <Typography variant="h6" color="textSecondary">
                        Present: {profile.present ? "Yes" : "No"}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Verified By Ground Staff:{" "}
                        {profile.workVerified ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    onClick={() => verifyAttendance(profile)}
                  >
                    Verify Attendance
                  </Button>
                  <Grid item xs={12}>
                    <SingleLineImageList itemData={profile.images} />
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

