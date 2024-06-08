import { React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import AdminSidebar from "./sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { api_url } from "../../routes";

const TotalUsers = () => {
  const [usersData, setUsersData] = useState([]),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();

    handleSearchUsers();
  };

  const handleSearchUsers = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/admin/userSearch.php",
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setUsersData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        url: api_url + "/admin/users.php",
      })
        .then((response) => {
          setUsersData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    //Axios to get data from server

    axios({
      method: "get",

      url: api_url + "/admin/users.php",
    })
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  var count = 1; //Will increment the No. column of the table
  return (
    <section id="active">
      <AdminSidebar />

      <div className="container">
        <Header />

        <div className="content_part project_content">
          {isLoading ? (
            <div className="loading_screen"></div>
          ) : (
            <>
              <div className="part_1">
                <div className="title_part">
                  <h2>Total Users</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handleUserSubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchUsers}
                    />
                  </div>
                </form>
              </div>

              <div className="part_3">
                <table className="appoints">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>User Id</th>
                      <th>Username</th>
                      <th>Email</th>

                      <th>User Type</th>
                      <th>Terms Agreed</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {usersData.length != 0 ? (
                      usersData.map((row) => (
                        <tr key={row.user_id}>
                          <td>{count++}</td>
                          <td>{row.user_id}</td>
                          <td>{row.username}</td>
                          <td>{row.email}</td>

                          <td>{row.user_type}</td>
                          <td>{row.terms_agreed}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={6}>
                          Ooops! No User Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="summary_part">
                <div className="summary_1">
                  <p>Total Users: {usersData.length}</p>
                </div>

                <div className="summary_2"></div>

                <div className="summary_2"></div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>

      <ToastContainer />
    </section>
  );
};

export default TotalUsers;
