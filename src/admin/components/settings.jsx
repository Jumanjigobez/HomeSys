import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import { api_url } from "../../routes";

const AdminSettings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [accountUpdate, setAccountUpdate] = useState({
      updated: 0,
    }),
    [tableData, setTableData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({
      userName: "",
    }),
    [errors, setErrors] = useState({
      username: "",
      email: "",
      password: "",
      c_password: "",
      response: "",
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const username_ref = useRef(),
    email_ref = useRef(),
    psk_ref = useRef(),
    cpsk_ref = useRef();

  const handlePassword = () => {
    let psk_length = psk_ref.current.value.length,
      cpsk_length = cpsk_ref.current.value.length,
      show_btn = document.querySelector(".show_psk"),
      show_btn2 = document.querySelector(".show_psk2");

    if (psk_length >= 1) {
      show_btn.style.display = "block";
    } else {
      show_btn.style.display = "none";
    }

    if (cpsk_length >= 1) {
      show_btn2.style.display = "block";
    } else {
      show_btn2.style.display = "none";
    }
  };

  const handleViewpsk = (elem) => {
    const iconElement = elem.currentTarget.querySelector("i");

    if (psk_ref.current.type === "password") {
      psk_ref.current.type = "text";
      iconElement.className = "fa-solid fa-eye";
    } else {
      psk_ref.current.type = "password";
      iconElement.className = "fa-solid fa-eye-slash";
    }
  };

  const handleViewpsk2 = (elem) => {
    const iconElement = elem.currentTarget.querySelector("i");

    if (cpsk_ref.current.type === "password") {
      cpsk_ref.current.type = "text";
      iconElement.className = "fa-solid fa-eye";
    } else {
      cpsk_ref.current.type = "password";
      iconElement.className = "fa-solid fa-eye-slash";
    }
  };

  const handleUpdateAccount = () => {
    //Validate the input fields
    const errors = {},
      email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username_ref.current.value === "") {
      errors.username = "Username Required";
    }

    if (email_ref.current.value === "") {
      errors.email = "Email Required";
    } else if (!email_ref.current.value.match(email_regex)) {
      errors.email = "Invalid Email";
    }

    if (psk_ref.current.value !== cpsk_ref.current.value) {
      errors.response = "Password Mismatch";
    }

    setErrors(errors);

    if (JSON.stringify(errors).length === 2) {
      //if there is no error proceed to submit, 2 is for the curly braces
      return true;
    } else {
      return false;
    }
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const error_free = handleUpdateAccount();

    if (error_free) {
      let new_username = username_ref.current.value,
        new_email = email_ref.current.value,
        new_psk = psk_ref.current.value,
        formData = new FormData();

      formData.append("new_username", new_username);
      formData.append("new_email", new_email);
      formData.append("new_psk", new_psk);

      axios({
        //Update the new task and status in the database
        method: "post",
        url: api_url + "/account/updateAccount.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          if (response.data == 1) {
            let sessions = JSON.parse(localStorage.getItem("sessions"));

            toast.success("Updated successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,
            });

            setAccountUpdate((prevState) => {
              return {
                ...prevState,
                updated: prevState.updated + 1,
              };
            });
          } else if (response.data == 2) {
            toast.error("Username or Email Exists", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000,
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
    }
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/account/deleteAccount.php",
      params: { user_id: user },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          localStorage.clear();

          toast.success(
            "Account Deleted Successfully. We'll Miss You! If you ever decide to come back, we'll be here for you.",
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            }
          );

          setTimeout(() => {
            navigate("/login");
          }, 3000);
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

  const openDialogAccount = (x) => {
    if (x === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        username: username_ref.current.value,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
      setErrors("");
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: api_url + "/account/getAccount.php",
      params: { user_id: user },
      withCredentials: false,
    })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [accountUpdate]);

  return (
    <section id="active">
      <AdminSidebar />

      <div className="container">
        <Header />

        <div className="content_part todo_content settings_content">
          {isLoading ? (
            <div className="loading_screen"></div>
          ) : (
            <>
              <div className="title_part">
                <h2>Account Settings</h2>
              </div>
              {
                //User Profile Photo Coming Soon
              }
              {/* <div className="part_1">
                <img src="../images/avatar.png" alt="Profile Photo" />
                <button className="normal_btn">Edit</button>
                <button className="normal_btn">Delete</button>
              </div> */}

              <div className="part_2 form_part">
                {errors.response !== "" ? (
                  <span className="error_msg response_text">
                    {errors.response}
                  </span>
                ) : null}
                <form
                  action=""
                  method="post"
                  className="settings_form"
                  onSubmit={handleSubmitUpdate}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      defaultValue={
                        tableData.length !== 0
                          ? tableData.map((row) => row.username)
                          : ""
                      }
                      required
                      ref={username_ref}
                      // {...formik.getFieldProps("username")}
                    />
                    {errors.username !== "" ? (
                      <span className="error_msg">{errors.username}</span>
                    ) : null}
                  </div>

                  <div className="input_group">
                    <input
                      type="email"
                      name="mail"
                      id="mail"
                      placeholder="Email"
                      defaultValue={
                        tableData.length !== 0
                          ? tableData.map((row) => row.email)
                          : ""
                      }
                      required
                      ref={email_ref}
                      // {...formik.getFieldProps("username")}
                    />
                    {errors.username !== "" ? (
                      <span className="error_msg">{errors.email}</span>
                    ) : null}
                  </div>

                  <div className="input_group">
                    <input
                      type="password"
                      name="psk"
                      id="psk"
                      placeholder="New Password"
                      ref={psk_ref}
                      onChange={handlePassword}

                      // {...formik.getFieldProps("password")}
                    />
                    {errors.password !== "" ? (
                      <span className="error_msg">{errors.password}</span>
                    ) : null}

                    <div className="show_psk" onClick={(e) => handleViewpsk(e)}>
                      <i className="fa-solid fa-eye-slash"></i>
                    </div>
                  </div>

                  <div className="input_group">
                    <input
                      type="password"
                      name="c_psk"
                      id="c_psk"
                      placeholder="Confirm New Password"
                      ref={cpsk_ref}
                      onChange={handlePassword}

                      // {...formik.getFieldProps("password")}
                    />
                    {errors.password !== "" ? (
                      <span className="error_msg">{errors.c_password}</span>
                    ) : null}

                    <div
                      className="show_psk2"
                      onClick={(e) => handleViewpsk2(e)}
                    >
                      <i className="fa-solid fa-eye-slash"></i>
                    </div>
                  </div>

                  <div className="input_group">
                    <button type="submit" style={{ display: "none" }}></button>
                  </div>
                </form>
              </div>

              <div className="grouping">
                <div className="input_group">
                  <button className="btn" onClick={handleSubmitUpdate}>
                    Update Account
                  </button>
                </div>

                <div className="input_group">
                  <button
                    className="btn delete_btn"
                    onClick={() => openDialogAccount("delete")}
                  >
                    Delete Account
                  </button>
                </div>
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
              <h2>{dialogFields.dialogTitle} My Account</h2>
            </div>

            <div className="form_part">
              {dialogType === "delete" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleDeleteAccount}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this account of -{" "}
                      <span style={{ color: "red" }}>
                        {dialogFields.username}
                      </span>
                    </h3>
                  </div>

                  <div className="input_group">
                    <button
                      className="btn"
                      type="submit"
                      onClick={handleDeleteAccount}
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default AdminSettings;
