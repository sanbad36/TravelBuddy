import "./App.css";
import Home from "./pages/Home/Home";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import List from "./pages/list/List";
import ListProject from "./pages/list/ListProject";
import ListInventory from "./pages/list/ListInventory";
import Notification from "./pages/Notification/Notification";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { userInputs, BlogInputs } from "./pages/FormSource";
import Blogs from "./pages/allBlogs/Blogs";
import Statistics from "./pages/Statistics/Statistics";
import Chatbot from "./components/Chatbot";
import Workers from "./components/Workers/Workers";
import Attendance from "./components/Attendance";
import ImgToTxt from "./components/imgtotext/ImgToTxt";
// import Dashboard from "./components/adminPanelCompany/Dashboard";
import LeaderBoard from "./pages/LeaderBoard";
import FundDonation from "./pages/FundDonation";
import HindiHome from "./pages/Home/HindiHome";
import Logistics from "./pages/Logistics";
import AssignTasks from "./pages/AssignTasks";
import SendReminder from "./pages/SendReminder";
function App() {
  const navigate = useNavigate();
  const alanKey =
    "cfdac5b36d0a78de9cd6709b0a7e592e2e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === "login") {
          navigate("/login");
        } else if (command === "signup") {
          navigate("/signup");
        } else if (command === "home") {
          navigate("/");
        }
      },
    });
  }, []);

  const chartData = [
    { name: "January", Total: 21 },
    { name: "February", Total: 18 },
    { name: "march", Total: 20 },
    { name: "april", Total: 30 },
    // { name: "may", Total: 12 },
    // { name: "june", Total: 23 },
    // { name: "july", Total: 34 },
  ];

  const chartData1 = [
    { name: "January", Total: 21 },
    { name: "February", Total: 10 },
    { name: "march", Total: 10 },
    { name: "april", Total: 20 },
    // { name: "may", Total: 12 },
    // { name: "june", Total: 23 },
    // { name: "july", Total: 34 },
  ];

  const chartData2 = [
    { name: "January", Total: 21 },
    { name: "February", Total: 18 },
    { name: "march", Total: 9 },
    { name: "april", Total: 15 },
    // { name: "may", Total: 12 },
    // { name: "june", Total: 23 },
    // { name: "july", Total: 34 },
  ];

  const chartData3 = [
    { name: "January", Total: 21 },
    { name: "February", Total: 18 },
    { name: "march", Total: 5 },
    { name: "april", Total: 6 },
    // { name: "may", Total: 12 },
    // { name: "june", Total: 23 },
    // { name: "july", Total: 34 },
  ];

  const data = [
    {
      _id: "629b75886e5c7a0b286c080b",
      ngoID: {
        _id: "629b6f43f4646a0cb3fdaad7",
        name: "Place1",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9870001817,
        location: "Whitefield",
        createdAt: "2022-06-04T14:42:11.220Z",
        updatedAt: "2022-06-04T14:42:11.220Z",
        __v: 0,
      },
      programID: {
        _id: "629b734637932048c62ba99d",
        name: "Place1",
        createdAt: "2022-06-04T14:59:18.699Z",
        updatedAt: "2022-06-04T14:59:18.699Z",
        __v: 0,
      },
      userID: {
        _id: "629b667017cc398feb814115",
        name: "Full Name1",
        password: "codeforgood",
        username: "user1",
        designation: "Area Manager",
        createdAt: "2022-06-04T14:04:32.138Z",
        updatedAt: "2022-06-04T14:04:32.138Z",
        __v: 0,
        isAdmin: true,
      },
      month: "March",
      year: "2022",
      food: 30,
      children: 12,
      senior: 22,
      female: 8,
      male: 40,
      diffabled: 3,
      charitypartners: "Partner1",
      createdAt: "2022-06-04T15:08:56.627Z",
      updatedAt: "2022-06-04T15:08:56.627Z",
      __v: 0,
      total: 48,
    },
    {
      _id: "629b76f76e5c7a0b286c080d",
      ngoID: {
        _id: "629b719937932048c62ba98f",
        name: "NGO2",
        joindate: "2022-02-01T00:00:00.000Z",
        contact: 9870001819,
        location: "MG Road",
        createdAt: "2022-06-04T14:52:09.951Z",
        updatedAt: "2022-06-04T14:52:09.951Z",
        __v: 0,
      },
      programID: {
        _id: "629b734637932048c62ba99d",
        name: "Place1",
        createdAt: "2022-06-04T14:59:18.699Z",
        updatedAt: "2022-06-04T14:59:18.699Z",
        __v: 0,
      },
      userID: {
        _id: "629b66a117cc398feb814117",
        name: "Full Name2",
        password: "codeforgood",
        username: "user2",
        designation: "Area Manager",
        createdAt: "2022-06-04T14:05:21.921Z",
        updatedAt: "2022-06-04T14:05:21.921Z",
        __v: 0,
        isAdmin: false,
      },
      month: "March",
      year: "2022",
      food: 50,
      children: 12,
      senior: 22,
      female: 10,
      male: 42,
      diffabled: 3,
      charitypartners: "No",
      createdAt: "2022-06-04T15:15:03.596Z",
      updatedAt: "2022-06-04T15:15:03.596Z",
      __v: 0,
      total: 52,
    },
    {
      _id: "629b7fb96e5c7a0b286c080f",
      ngoID: {
        _id: "629b71ae37932048c62ba991",
        name: "Place1",
        joindate: "2022-02-04T00:00:00.000Z",
        contact: 9870101819,
        location: "South Bangalore",
        createdAt: "2022-06-04T14:52:30.324Z",
        updatedAt: "2022-06-04T14:52:30.324Z",
        __v: 0,
      },
      programID: {
        _id: "629b734e37932048c62ba99f",
        name: "foodrescue",
        createdAt: "2022-06-04T14:59:26.214Z",
        updatedAt: "2022-06-04T14:59:26.214Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
      },
      month: "February",
      year: "2022",
      food: 72,
      children: 15,
      senior: 29,
      female: 19,
      male: 52,
      diffabled: 8,
      charitypartners: "No",
      createdAt: "2022-06-04T15:52:25.473Z",
      updatedAt: "2022-06-04T15:52:25.473Z",
      __v: 0,
      total: 71,
    },
    {
      _id: "629b80186e5c7a0b286c0811",
      ngoID: {
        _id: "629b71c137932048c62ba993",
        name: "NGO4",
        joindate: "2022-03-04T00:00:00.000Z",
        contact: 9870101820,
        location: "KSR Central",
        createdAt: "2022-06-04T14:52:49.403Z",
        updatedAt: "2022-06-04T14:52:49.403Z",
        __v: 0,
      },
      programID: {
        _id: "629b734e37932048c62ba99f",
        name: "foodrescue",
        createdAt: "2022-06-04T14:59:26.214Z",
        updatedAt: "2022-06-04T14:59:26.214Z",
        __v: 0,
      },
      userID: {
        _id: "629b6bf0f4646a0cb3fdaad1",
        name: "Full Name4",
        password: "codeforgood",
        username: "user4",
        designation: "Branch Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:28:00.818Z",
        updatedAt: "2022-06-04T14:28:00.818Z",
        __v: 0,
      },
      month: "January",
      year: "2022",
      food: 25,
      children: 17,
      senior: 15,
      female: 10,
      male: 29,
      diffabled: 3,
      charitypartners: "Partner2",
      createdAt: "2022-06-04T15:54:00.157Z",
      updatedAt: "2022-06-04T15:54:00.157Z",
      __v: 0,
      total: 39,
    },
    {
      _id: "629b80db6e5c7a0b286c0813",
      ngoID: {
        _id: "629b720237932048c62ba995",
        name: "NGO5",
        joindate: "2022-03-04T00:00:00.000Z",
        contact: 9870221820,
        location: "Cantonment",
        createdAt: "2022-06-04T14:53:54.878Z",
        updatedAt: "2022-06-04T14:53:54.878Z",
        __v: 0,
      },
      programID: {
        _id: "629b735637932048c62ba9a1",
        name: "breakfastfeeding",
        createdAt: "2022-06-04T14:59:34.821Z",
        updatedAt: "2022-06-04T14:59:34.821Z",
        __v: 0,
      },
      userID: {
        _id: "629b6d4ff4646a0cb3fdaad3",
        name: "Full Name5",
        password: "codeforgood",
        username: "user5",
        designation: "Admin",
        isAdmin: true,
        createdAt: "2022-06-04T14:33:51.541Z",
        updatedAt: "2022-06-04T14:33:51.541Z",
        __v: 0,
      },
      month: "February",
      year: "2022",
      food: 26,
      children: 20,
      senior: 10,
      female: 15,
      male: 15,
      diffabled: 7,
      charitypartners: "Partner3",
      createdAt: "2022-06-04T15:57:15.800Z",
      updatedAt: "2022-06-04T15:57:15.800Z",
      __v: 0,
      total: 30,
    },
    {
      _id: "629b81396e5c7a0b286c0815",
      ngoID: {
        _id: "629b721537932048c62ba997",
        name: "NGO6",
        joindate: "2022-01-04T00:00:00.000Z",
        contact: 9870221820,
        location: "Whitefield",
        createdAt: "2022-06-04T14:54:13.230Z",
        updatedAt: "2022-06-04T14:54:13.230Z",
        __v: 0,
      },
      programID: {
        _id: "629b735637932048c62ba9a1",
        name: "breakfastfeeding",
        createdAt: "2022-06-04T14:59:34.821Z",
        updatedAt: "2022-06-04T14:59:34.821Z",
        __v: 0,
      },
      userID: {
        _id: "629b667017cc398feb814115",
        name: "Full Name1",
        password: "codeforgood",
        username: "user1",
        designation: "Area Manager",
        createdAt: "2022-06-04T14:04:32.138Z",
        updatedAt: "2022-06-04T14:04:32.138Z",
        __v: 0,
        isAdmin: true,
      },
      month: "March",
      year: "2022",
      food: 50,
      children: 14,
      senior: 21,
      female: 20,
      male: 18,
      diffabled: 7,
      charitypartners: "No",
      createdAt: "2022-06-04T15:58:49.770Z",
      updatedAt: "2022-06-04T15:58:49.770Z",
      __v: 0,
      total: 38,
    },
    {
      _id: "629b82b36e5c7a0b286c0817",
      ngoID: {
        _id: "629b722337932048c62ba999",
        name: "NGO7",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221820,
        location: "Whitefield",
        createdAt: "2022-06-04T14:54:27.138Z",
        updatedAt: "2022-06-04T14:54:27.138Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b66a117cc398feb814117",
        name: "Full Name2",
        password: "codeforgood",
        username: "user2",
        designation: "Area Manager",
        createdAt: "2022-06-04T14:05:21.921Z",
        updatedAt: "2022-06-04T14:05:21.921Z",
        __v: 0,
        status: "Pending",
        isAdmin: false,
      },
      month: "January",
      year: "2022",
      food: 56,
      children: 17,
      senior: 10,
      female: 10,
      male: 19,
      diffabled: 2,
      charitypartners: "No",
      createdAt: "2022-06-04T16:05:07.693Z",
      updatedAt: "2022-06-04T16:05:07.693Z",
      __v: 0,
      total: 29,
    },
    {
      _id: "629b82fa6e5c7a0b286c0819",
      ngoID: {
        _id: "629b722c37932048c62ba99b",
        name: "NGO8",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221520,
        location: "KSR",
        createdAt: "2022-06-04T14:54:36.458Z",
        updatedAt: "2022-06-04T14:54:36.458Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
        status: "Pending",
      },
      month: "March",
      year: "2022",
      food: 15,
      children: 11,
      senior: 15,
      female: 15,
      male: 20,
      diffabled: 2,
      charitypartners: "Partner5",
      createdAt: "2022-06-04T16:06:18.117Z",
      updatedAt: "2022-06-04T16:06:18.117Z",
      __v: 0,
      total: 52,
    },
    {
      _id: "629b82fa6e5c7a0b286c0819",
      ngoID: {
        _id: "629b722c37932048c62ba99b",
        name: "NGO8",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221520,
        location: "KSR",
        createdAt: "2022-06-04T14:54:36.458Z",
        updatedAt: "2022-06-04T14:54:36.458Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
        status: "Pending",
      },
      month: "April",
      year: "2022",
      food: 15,
      children: 11,
      senior: 15,
      female: 15,
      male: 20,
      diffabled: 2,
      charitypartners: "Partner5",
      createdAt: "2022-06-04T16:06:18.117Z",
      updatedAt: "2022-06-04T16:06:18.117Z",
      __v: 0,
      total: 35,
    },
    {
      _id: "629b82fa6e5c7a0b286c0819",
      ngoID: {
        _id: "629b722c37932048c62ba99b",
        name: "NGO8",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221520,
        location: "KSR",
        createdAt: "2022-06-04T14:54:36.458Z",
        updatedAt: "2022-06-04T14:54:36.458Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
        status: "Pending",
      },
      month: "August",
      year: "2022",
      food: 15,
      children: 11,
      senior: 15,
      female: 15,
      male: 20,
      diffabled: 2,
      charitypartners: "Partner5",
      createdAt: "2022-06-04T16:06:18.117Z",
      updatedAt: "2022-06-04T16:06:18.117Z",
      __v: 0,
      total: 7,
    },
    {
      _id: "629b82fa6e5c7a0b286c0819",
      ngoID: {
        _id: "629b722c37932048c62ba99b",
        name: "NGO8",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221520,
        location: "KSR",
        createdAt: "2022-06-04T14:54:36.458Z",
        updatedAt: "2022-06-04T14:54:36.458Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
        status: "Pending",
      },
      month: "October",
      year: "2022",
      food: 15,
      children: 11,
      senior: 15,
      female: 15,
      male: 20,
      diffabled: 2,
      charitypartners: "Partner5",
      createdAt: "2022-06-04T16:06:18.117Z",
      updatedAt: "2022-06-04T16:06:18.117Z",
      __v: 0,
      total: 19,
    },
    {
      _id: "629b82fa6e5c7a0b286c0819",
      ngoID: {
        _id: "629b722c37932048c62ba99b",
        name: "NGO8",
        joindate: "2022-01-01T00:00:00.000Z",
        contact: 9871221520,
        location: "KSR",
        createdAt: "2022-06-04T14:54:36.458Z",
        updatedAt: "2022-06-04T14:54:36.458Z",
        __v: 0,
      },
      programID: {
        _id: "629b735c37932048c62ba9a3",
        name: "foodrelief",
        createdAt: "2022-06-04T14:59:40.158Z",
        updatedAt: "2022-06-04T14:59:40.158Z",
        __v: 0,
      },
      userID: {
        _id: "629b6be8f4646a0cb3fdaacf",
        name: "Full Name3",
        password: "codeforgood",
        username: "user3",
        designation: "Program Manager",
        isAdmin: false,
        createdAt: "2022-06-04T14:27:52.173Z",
        updatedAt: "2022-06-04T14:27:52.173Z",
        __v: 0,
        status: "Pending",
      },
      month: "November",
      year: "2022",
      food: 15,
      children: 11,
      senior: 15,
      female: 15,
      male: 20,
      diffabled: 2,
      charitypartners: "Partner5",
      createdAt: "2022-06-04T16:06:18.117Z",
      updatedAt: "2022-06-04T16:06:18.117Z",
      __v: 0,
      total: 27,
    },
  ];

  let program1 = [];

  let totalProgram1 = [];

  const program1Details = [];
  // useEffect(() => {
  data.map((res) => {
    if (res.programID._id === "629b735c37932048c62ba9a3") {
      program1.push(res);
    }
  });

  program1.forEach((res) => {
    totalProgram1.push({ name: res.month, Total: res.total });
  });

  program1.forEach((res) => {
    program1Details.push({
      id: res._id,
      title: res.ngoID.name,
      author: res.userID.name,
      status: res.userID.status,
      tags: res.userID.designation,
    });
  });
  console.log(program1Details);
  // }, []);

  // function fetchDetails(x) {
  //   return x.map((res) => {
  //     return {
  //       id: res._id,
  //       title: res.ngoID.name,
  //       author: res.userID.name,
  //       tags: res.userID.designation,
  //     };
  //   });
  // }

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Home
                  data={5}
                  chartData={totalProgram1}
                  program1Details={program1Details}
                />
              }
            />
            <Route
              path="program2"
              element={
                <Home
                  data={6}
                  chartData={chartData1}
                  program1Details={program1Details}
                />
              }
            />
            <Route
              path="program3"
              element={
                <Home
                  data={7}
                  chartData={chartData2}
                  program1Details={program1Details}
                />
              }
            />
            <Route
              path="program4"
              element={
                <Home
                  data={8}
                  chartData={chartData3}
                  program1Details={program1Details}
                />
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="notification" element={<Notification />} />
            <Route
              path="Statistics"
              element={<Statistics chartData={chartData2} 
                  data1={5}
                  chartData1={totalProgram1}
                  program1Details1={program1Details}
              />}
            />
            <Route path="allblogs" element={<Blogs />} />
            <Route path="assignWorkers" element={<Workers />} />
          </Route>
          <Route path="/hin" element={<HindiHome />} exact />
          {/* <Route path="/hin">
              <Route index element={<HindiHome />} />
              <Route path="login" element={<Login />} />
              <Route path="notification" element={<Notification />} />
              <Route path="Statistics" element={<Statistics />} />
              <Route path="allblogs" element={<Blogs />} />
            </Route> */}
          <Route path="users">
            <Route index element={<List />} />

            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route>
          <Route path="projects">
            <Route index element={<ListProject />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route>
          <Route path="inventory">
            <Route index element={<ListInventory />} />

            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route>
          <Route path="attendance">
            <Route index element={<Attendance />} />

            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route>
          <Route path="imagetotext">
            <Route index element={<ImgToTxt />} />

            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route>
          {/* <Route path="dashboard">
            <Route index element={<Dashboard />} />

            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add users" />}
            />
          </Route> */}
          <Route path="blogs">
            <Route index element={<List />} />
            <Route path=":blogId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={BlogInputs} title="Add Blog" />}
            />
          </Route>
          <Route path="leaderboard" exact element={<LeaderBoard />} />
          <Route path="fundDonation" exact element={<FundDonation />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="assignTasks" element={<AssignTasks />} />
          <Route path="sendReminder" element={<SendReminder />} />
        </Routes>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
