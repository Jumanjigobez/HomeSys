import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { menuOpen } from "../store/actions";
const Header = () => {
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
  const handleLogout = () => {
    localStorage.clear();

    toast.success("Good Bye :)", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/login");
      // window.location.reload()//Reload to remove any router bugs
    }, 3000);
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
          <button className="btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>
      <ToastContainer />
    </>
  );
};

export default Header;
