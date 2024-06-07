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
              <NavLink to="/adminHome" activeClassName="active">
                <i className="fa-solid fa-house"></i> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/total-users" activeClassName="active">
                <i class="fa-solid fa-users"></i> <span>Total Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/online-users" activeClassName="active">
                <i class="fa-solid fa-signal"></i> <span>Online Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user-management" activeClassName="active">
                <i class="fa-solid fa-shield-cat"></i> <span>Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/basic-analytics" activeClassName="active">
                <i class="fa-solid fa-chart-line"></i> <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" activeClassName="active">
                <i class="fa-solid fa-bell"></i> <span>Notifications</span>
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

export default AdminSidebar;
