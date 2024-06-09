import { React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import AdminSidebar from "./sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { api_url } from "../../routes";

const UserManagement = () => {
  const [usersData, setUsersData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({}),
    [usersUpdate, setUsersUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const UserId_input = useRef(),
    Username_input = useRef(),
    Email_input = useRef(),
    Psk_input = useRef(),
    Status_input = useRef(),
    UserType_input = useRef(),
    TermsAgreed_input = useRef();

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

  const openDialogAdd = () => {
    setDialogFields({
      dialogTitle: "Add",
    });

    setDialogType("add");
    setIsDialogOpen(true);
  };

  const openDialogUsers = (type, e) => {
    let row = e.target.parentElement.parentElement, //access the whole row of that element
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        UserId: fields[1].innerText,
        Username: fields[2].innerText,
        Email: fields[3].innerText,
        Psk: fields[4].innerText,
        Status: fields[5].innerText,
        UserType: fields[6].innerText,
        TermsAgreed: fields[7].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        UserId: fields[1].innerText,
        Username: fields[2].innerText,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
    }
  };

  const handleAddUsers = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Username", Username_input.current.value);
    formData.append("Email", Email_input.current.value);
    formData.append("Psk", Psk_input.current.value);
    formData.append("Status", Status_input.current.value);
    formData.append("UserType", UserType_input.current.value);
    formData.append("TermsAgreed", TermsAgreed_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/admin/addUser.php",
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Added successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setUsersUpdate((prevState) => {
            return {
              ...prevState,
              updated: prevState.updated + 1,
            };
          });
        } else {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((e) => {
        alert("Network Error", e);
      });

    setIsDialogOpen(false);
  };

  const handleUpdateUsers = (e, row_id) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("UserId", row_id);
    formData.append("Username", Username_input.current.value);
    formData.append("Email", Email_input.current.value);
    formData.append("Psk", Psk_input.current.value);
    formData.append("Status", Status_input.current.value);
    formData.append("UserType", UserType_input.current.value);
    formData.append("TermsAgreed", TermsAgreed_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/admin/editUser.php",
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Updated successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setUsersUpdate((prevState) => {
            return {
              ...prevState,
              updated: prevState.updated + 1,
            };
          });
        } else {
          toast.error("Oops, Something's wrong :(", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((e) => {
        alert("Network Error", e);
      });

    setIsDialogOpen(false);
  };

  const handleDeleteUsers = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/admin/deleteUser.php",
      params: { UserId: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setUsersUpdate((prevState) => {
            return {
              ...prevState,
              updated: prevState.updated + 1,
            };
          });
        } else {
          toast.error("Oops, Something's wrong :(", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((e) => {
        alert("Network Error", e);
      });

    setIsDialogOpen(false);
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
  }, [usersUpdate]);

  var count = 1; //Will increment the No. column of the table

  const onlineUsers = usersData.filter((user) => user.status === "online");
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
                  <h2>User Management</h2>
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
                      <th>Password</th>
                      <th>Status</th>

                      <th>User Type</th>
                      <th>Terms Agreed</th>
                      <th>Reg Date</th>
                      <th>Actions</th>
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
                          <td>{row.psk}</td>
                          <td>{row.status}</td>
                          <td>{row.user_type}</td>
                          <td>{row.terms_agreed}</td>
                          <td>{row.reg_date}</td>
                          <td className="actions">
                            <button
                              className="btn action_btn"
                              onClick={(e) => openDialogUsers("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) => openDialogUsers("delete", e)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={10}>
                          Ooops! No User Found. Please Add Row
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

                <div className="summary_2">
                  <p>Total Online: {onlineUsers.length}</p>
                </div>
              </div>

              <div className="button_part">
                <button className="btn" onClick={openDialogAdd}>
                  Add Row
                </button>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
      {isDialogOpen && (
        <div className="dialog_container">
          <div className="dialog_box">
            <div className="close_part">
              <button
                className="btn close_btn"
                onClick={() => setIsDialogOpen(false)}
              >
                X
              </button>
            </div>

            <div className="title_part">
              <h2>{dialogFields.dialogTitle} User</h2>
            </div>

            <div className="form_part contacts_form">
              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateUsers(e, dialogFields.UserId)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="UserId">UserId</label>
                      <input
                        type="text"
                        name="UserId"
                        id="UserId"
                        placeholder="UserId"
                        defaultValue={dialogFields.UserId}
                        ref={UserId_input}
                        disabled
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Username">Username</label>
                      <input
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="Username"
                        defaultValue={dialogFields.Username}
                        ref={Username_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        placeholder="Email"
                        defaultValue={dialogFields.Email}
                        ref={Email_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Psk">Password</label>
                      <input
                        type="password"
                        name="Psk"
                        id="Psk"
                        placeholder="Password"
                        defaultValue={dialogFields.Psk}
                        ref={Psk_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="Status">Status</label>
                      <div className="custom_select">
                        <select
                          name="Status"
                          id="Status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="online">online</option>
                          <option value="offline">offline</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="UserType">User Type</label>
                      <div className="custom_select">
                        <select
                          name="UserType"
                          id="UserType"
                          defaultValue={dialogFields.UserType}
                          required
                          ref={UserType_input}
                        >
                          <option value="normal">normal</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_4">
                    <div className="input_group">
                      <label htmlFor="TermsAgreed">Terms Agreed</label>
                      <div className="custom_select">
                        <select
                          name="TermsAgreed"
                          id="TermsAgreed"
                          defaultValue={dialogFields.TermsAgreed}
                          required
                          ref={TermsAgreed_input}
                        >
                          <option value="Agreed">Agreed</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_5">
                    <div className="input_group">
                      <button type="submit" className="btn">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              ) : dialogType === "add" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleAddUsers(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="UserId">UserId</label>
                      <input
                        type="text"
                        name="UserId"
                        id="UserId"
                        placeholder="UserId"
                        defaultValue={dialogFields.UserId}
                        ref={UserId_input}
                        disabled
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Username">Username</label>
                      <input
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="Username"
                        defaultValue={dialogFields.Username}
                        ref={Username_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        placeholder="Email"
                        defaultValue={dialogFields.Email}
                        ref={Email_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Psk">Password</label>
                      <input
                        type="password"
                        name="Psk"
                        id="Psk"
                        placeholder="Password"
                        defaultValue={dialogFields.Psk}
                        ref={Psk_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="Status">Status</label>
                      <div className="custom_select">
                        <select
                          name="Status"
                          id="Status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="online">online</option>
                          <option value="offline">offline</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="UserType">User Type</label>
                      <div className="custom_select">
                        <select
                          name="UserType"
                          id="UserType"
                          defaultValue={dialogFields.UserType}
                          required
                          ref={UserType_input}
                        >
                          <option value="normal">normal</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_4">
                    <div className="input_group">
                      <label htmlFor="TermsAgreed">Terms Agreed</label>
                      <div className="custom_select">
                        <select
                          name="TermsAgreed"
                          id="TermsAgreed"
                          defaultValue={dialogFields.TermsAgreed}
                          required
                          ref={TermsAgreed_input}
                        >
                          <option value="Agreed">Agreed</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_5">
                    <div className="input_group">
                      <button type="submit" className="btn">
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleDeleteUsers(e, dialogFields.UserId)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this User -
                      <span style={{ color: "red" }}>
                        {dialogFields.Username}
                      </span>
                    </h3>
                  </div>

                  <div className="input_group">
                    <button className="btn" type="submit">
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default UserManagement;
