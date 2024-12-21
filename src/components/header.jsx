import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../store/actions";
import { api_url } from "../routes";
const Header = () => {
  const [showProfileCont, setShowProfileCont] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const menuOpened = useSelector((state) => state.MenuReducer); //Access the global state from redux store for the menu sidebar functionality

  const handleMenuBtn = () => {
    if (menuOpened) {
      dispatch(menuOpen(false)); //dispatch for false to make the sidebar be closed
    } else {
      dispatch(menuOpen(true));
    }
  };
  const handleLogout = (e) => {
    e.target.disabled = true;
    const user = JSON.parse(localStorage.getItem("sessions")).user_id;
    // console.log(user);
    //Update the status of the user to offline

    //https://homesys.000webhostapp.com/PHP/login.php

    let formData = new FormData();
    formData.append("user_id", user);

    axios({
      method: "post",
      url: api_url + "/logout.php",
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then((response) => {
        if (response.data === 1) {
          //Meaning success

          localStorage.clear();

          toast.success("Good Bye :)", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/login");
            // window.location.reload()//Reload to remove any router bugs
          }, 3000);
        } else {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGoToSettings = () => {
    navigate("/settings");
  };
  return (
    <>
      <header className="header">
        <div
          className={menuOpened ? "menu_btn active" : "menu_btn"}
          onClick={handleMenuBtn}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="logo_part">
          <h1>HomeSys</h1>
        </div>

        <div className="welcome_part">
          <h2>Welcome Back</h2>
        </div>

        <div className="user_part">
          <h2>
            {localStorage.length !== 0
              ? JSON.parse(localStorage.getItem("sessions")).username !== ""
                ? JSON.parse(localStorage.getItem("sessions")).username
                : "HomeSys"
              : "HomeSys"}
          </h2>

          {/* The Notification part*/}
          {/* <button className="btn notification_btn">
            <i className="fa-solid fa-bell"></i>
          </button> */}

          {/* <button className="btn" onClick={(e) => handleLogout(e)}>
            Log Out
          </button> */}

          <div
            className="profile_part"
            onClick={() => {
              showProfileCont
                ? setShowProfileCont(false)
                : setShowProfileCont(true);
            }}
          >
            <i className="fa-solid fa-user"></i>
          </div>

          <div
            className={
              showProfileCont ? "profile_container active" : "profile_container"
            }
          >
            <div className="settings_part">
              <button
                className="btn btn3"
                style={{ width: "100%" }}
                onClick={handleGoToSettings}
              >
                My Profile{" "}
                <span style={{ marginLeft: "0.5rem" }}>
                  <i className="fa-solid fa-gear"></i>
                </span>
              </button>
            </div>

            <div className="logout_part">
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={(e) => handleLogout(e)}
              >
                Log Out{" "}
                <span style={{ marginLeft: "0.5rem" }}>
                  <i class="fa-solid fa-right-from-bracket"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* <div className="notification_container">
        <div className="title">
          <h3>NOTIFICATIONS</h3>
        </div>

        <div className="content"></div>
      </div> */}
      <ToastContainer />
    </>
  );
};

export default Header;
