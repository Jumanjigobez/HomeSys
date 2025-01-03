import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import Todo from "./components/todo";
import Timetables from "./components/timetables";
import Personal_Timetable from "./components/personal_timetable";
import Class_Timetable from "./components/class_timetable";
import Projects from "./components/projects";
import Contacts from "./components/contacts";
import Appointments from "./components/appointments";
import Payments from "./components/payments";
import Events from "./components/events";
import Goals from "./components/goals";
import Settings from "./components/settings";

import AdminHome from "./admin/components/home";
import AdminSettings from "./admin/components/settings";
import TotalUsers from "./admin/components/total_users";
import OnlineUsers from "./admin/components/online-users";
import UserManagement from "./admin/components/user-management";
import ForgotPsk from "./components/forgot_psk";
import ResetPsk from "./components/reset_psk";

// http://localhost:8080/HOMESYS V1.0/homesys/PHP
//https://homesys.infinityfreeapp.com/PHP
export const api_url = "http://localhost:8080/HOMESYS V1.0/homesys/PHP";

// Check if user is already logged in to route to the required page
const sessionsData = localStorage.getItem("sessions");

export const userAdmin =
  localStorage && sessionsData && sessionsData !== "null"
    ? JSON.parse(sessionsData).user_type === "admin"
    : false; //Check is user is Admin

const MainRoutes = () => {
  // Check if localStorage and sessionsData are truthy
  const LoggedIn =
    localStorage && sessionsData && sessionsData !== "null"
      ? JSON.parse(sessionsData).user_id !== ""
      : false;

  // console.log(userAdmin);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Login} />
          <Route path={"/signup"} exact Component={Signup} />
          <Route path={"/forgot"} exact Component={ForgotPsk} />
          <Route path={"/reset"} exact Component={ResetPsk} />

          <Route
            path={LoggedIn ? "/home" : "/"}
            exact
            Component={LoggedIn ? Home : Login}
          />

          <Route
            path={LoggedIn ? "/todo" : "/"}
            exact
            Component={LoggedIn ? Todo : Login}
          />
          <Route
            path={LoggedIn ? "/goal" : "/"}
            exact
            Component={LoggedIn ? Goals : Login}
          />
          <Route
            path={LoggedIn ? "/timetables" : "/"}
            exact
            Component={LoggedIn ? Timetables : Login}
          />
          <Route
            path={LoggedIn ? "/timetables/personal" : "/"}
            exact
            Component={LoggedIn ? Personal_Timetable : Login}
          />
          <Route
            path={LoggedIn ? "/timetables/class" : "/"}
            exact
            Component={LoggedIn ? Class_Timetable : Login}
          />
          <Route
            path={LoggedIn ? "/projects" : "/"}
            exact
            Component={LoggedIn ? Projects : Login}
          />
          <Route
            path={LoggedIn ? "/contacts" : "/"}
            exact
            Component={LoggedIn ? Contacts : Login}
          />
          <Route
            path={LoggedIn ? "/appointments" : "/"}
            exact
            Component={LoggedIn ? Appointments : Login}
          />
          <Route
            path={LoggedIn ? "/payments" : "/"}
            exact
            Component={LoggedIn ? Payments : Login}
          />
          <Route
            path={LoggedIn ? "/events" : "/"}
            exact
            Component={LoggedIn ? Events : Login}
          />
          <Route
            path={LoggedIn ? "/settings" : "/"}
            exact
            Component={LoggedIn ? Settings : Login}
          />

          <Route
            path={LoggedIn && userAdmin ? "/adminHome" : "/"}
            exact
            Component={LoggedIn && userAdmin ? AdminHome : Login}
          />
          <Route
            path={LoggedIn && userAdmin ? "/adminSettings" : "/"}
            exact
            Component={LoggedIn && userAdmin ? AdminSettings : Login}
          />
          <Route
            path={LoggedIn && userAdmin ? "/total-users" : "/"}
            exact
            Component={LoggedIn && userAdmin ? TotalUsers : Login}
          />
          <Route
            path={LoggedIn && userAdmin ? "/online-users" : "/"}
            exact
            Component={LoggedIn && userAdmin ? OnlineUsers : Login}
          />
          <Route
            path={LoggedIn && userAdmin ? "/user-management" : "/"}
            exact
            Component={LoggedIn && userAdmin ? UserManagement : Login}
          />

          <Route path="*" Component={Login} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
