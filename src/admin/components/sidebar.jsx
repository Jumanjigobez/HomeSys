import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const menuOpened = useSelector((state) => state.MenuReducer);

  const handleGoToSettings = () => {
    navigate("/adminSettings");
  };
  return (
    <div className={menuOpened ? "sidebar" : "sidebar closed"}>
      <div className="logo_part">
        <img src="../images/logo.png" alt="HomeSys" />
      </div>

      <div className="menu_part">
        <nav>
          <ul>
            <li>
              <NavLink to="/adminHome" activeClassName="active" title="Home">
                <i className="fa-solid fa-house"></i> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/total-users"
                activeClassName="active"
                title="Total Users"
              >
                <i class="fa-solid fa-users"></i> <span>Total Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/online-users"
                activeClassName="active"
                title="Online Users"
              >
                <i class="fa-solid fa-signal"></i> <span>Online Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user-management"
                activeClassName="active"
                title="User Management"
              >
                <i class="fa-solid fa-shield-cat"></i> <span>Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/basic-analytics"
                activeClassName="active"
                title="Analytics"
              >
                <i class="fa-solid fa-chart-line"></i> <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notifications"
                activeClassName="active"
                title="Notifications"
              >
                <i class="fa-solid fa-bell"></i> <span>Notifications</span>
              </NavLink>
            </li>

            <br />

            <li>
              <NavLink to="/home" activeClassName="active" title="Client Home">
                <i class="fa-solid fa-house-user"></i> <span>Client Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
