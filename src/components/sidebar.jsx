import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuOpened = useSelector((state) => state.MenuReducer);

  const handleGoToSettings = () => {
    navigate("/settings");
  };
  return (
    <div className={menuOpened ? "sidebar" : "sidebar closed"}>
      <div className="logo_part">
        <img src="../images/logo.png" alt="H" />
      </div>

      <div className="menu_part">
        <nav>
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active">
                <i className="fa-solid fa-house"></i> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo" activeClassName="active">
                <i class="fa-solid fa-list-check"></i> <span>ToDo List</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/goal" activeClassName="active">
                <i class="fa-solid fa-bullseye"></i> <span>Goals</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/timetables" activeClassName="active">
                <i class="fa-solid fa-clock"></i> <span>Timetables</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" activeClassName="active">
                <i class="fa-solid fa-diagram-project"></i>{" "}
                <span>Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" activeClassName="active">
                <i class="fa-solid fa-address-book"></i> <span>Contacts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/appointments" activeClassName="active">
                <i class="fa-solid fa-building-user"></i>{" "}
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" activeClassName="active">
                <i class="fa-solid fa-hand-holding-dollar"></i>{" "}
                <span>Payments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" activeClassName="active">
                <i class="fa-solid fa-calendar-xmark"></i> <span>Events</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="settings_part">
        <button className="btn btn3" onClick={handleGoToSettings}>
          <i class="fa-solid fa-gear"></i> <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
