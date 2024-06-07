import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AdminSidebar from "./sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";

import axios from "axios";
import { api_url } from "../../routes";

const AdminHome = () => {
  const [userUpdate, setUserUpdate] = useState({
      updated: 0,
    }), //check if api has updated the todos
    [userData, setUserData] = useState([]),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  useEffect(() => {
    //Axios to get todo data

    axios({
      method: "get",
      url: api_url + "/admin/users.php",
      withCredentials: false,
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [userUpdate]);

  const Total_users = userData.length,
    Total_online = userData.filter((user) => user.status === "online");
  return (
    <>
      <section id="active">
        <AdminSidebar />

        <div className="container">
          <Header />

          <div className="content_part">
            {isLoading ? (
              <div className="loading_screen"></div>
            ) : (
              <>
                <NavLink to="/online-users">
                  <div className="box admin_box">
                    <div className="icon_part">
                      <i class="fa-solid fa-users"></i>
                    </div>
                    <div className="text_part">
                      <h2>Total Users</h2>
                      <p className="count">{Total_users}</p>
                    </div>
                  </div>
                </NavLink>

                <NavLink to="/total-users">
                  <div className="box admin_box">
                    <div className="icon_part">
                      <i class="fa-solid fa-signal"></i>
                    </div>
                    <div className="text_part">
                      <h2>Online Users</h2>
                      <p className="count">{Total_online.length}</p>
                    </div>
                  </div>
                </NavLink>

                <NavLink to="/user-management">
                  <div className="box admin_box">
                    <div className="icon_part">
                      <i class="fa-solid fa-shield-cat"></i>
                    </div>
                    <div className="text_part">
                      <h2>User Management</h2>
                    </div>
                  </div>
                </NavLink>

                <NavLink to="/basic-analytics">
                  <div className="box admin_box">
                    <div className="icon_part">
                      <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div className="text_part">
                      <h2>Basic Analytics</h2>
                    </div>
                  </div>
                </NavLink>

                <NavLink to="/notifications">
                  <div className="box admin_box">
                    <div className="icon_part">
                      <i class="fa-solid fa-bell"></i>
                    </div>
                    <div className="text_part">
                      <h2>Send Notifications</h2>
                    </div>
                  </div>
                </NavLink>
              </>
            )}
          </div>

          <Footer />
        </div>
      </section>
    </>
  );
};

export default AdminHome;
