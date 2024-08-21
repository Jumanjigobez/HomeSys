import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { userAdmin } from "../routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuOpened = useSelector((state) => state.MenuReducer);

  return (
    <div className={menuOpened ? "sidebar" : "sidebar closed"}>
      <div className="logo_part">
        <img src="../images/logo.png" alt="H" />
      </div>

      <div className="menu_part">
        <nav>
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active" title="Home">
                <i className="fa-solid fa-house"></i> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo" activeClassName="active" title="ToDo List">
                <i class="fa-solid fa-list-check"></i> <span>ToDo List</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/goal" activeClassName="active" title="Goals">
                <i class="fa-solid fa-bullseye"></i> <span>Goals</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/timetables"
                activeClassName="active"
                title="Timetables"
              >
                <i class="fa-solid fa-clock"></i> <span>Timetables</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" activeClassName="active" title="Projects">
                <i class="fa-solid fa-diagram-project"></i>{" "}
                <span>Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" activeClassName="active" title="Contacts">
                <i class="fa-solid fa-address-book"></i> <span>Contacts</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                activeClassName="active"
                title="Appointments"
              >
                <i class="fa-solid fa-building-user"></i>{" "}
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" activeClassName="active" title="Payments">
                <i class="fa-solid fa-hand-holding-dollar"></i>{" "}
                <span>Payments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" activeClassName="active" title="Events">
                <i class="fa-solid fa-calendar-xmark"></i> <span>Events</span>
              </NavLink>
            </li>

            {userAdmin && (
              <>
                <br />

                <li>
                  <NavLink
                    to="/adminHome"
                    activeClassName="active"
                    title="Admin Home"
                  >
                    <i class="fa-solid fa-house-user"></i>{" "}
                    <span>Admin Home</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
