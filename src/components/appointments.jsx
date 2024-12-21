import { React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Appointments = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [appointmentsData, setAppointmentsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [boxMarked, setBoxMarked] = useState(false),
    [checkedFields, setCheckedFields] = useState({
      Ids: [],
    }),
    [dialogFields, setDialogFields] = useState({});

  const [appointmentsUpdate, setAppointmentsUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const Name_input = useRef(),
    Address_input = useRef(),
    Contacts_input = useRef(),
    Date_input = useRef(),
    Type_input = useRef(),
    Status_input = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();

    handleSearchAppointment();
  };

  const handleSearchAppointment = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/appointments/appointmentSearch.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setAppointmentsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        params: { user_id: user },
        url: api_url + "/appointments/getAppointments.php",
      })
        .then((response) => {
          setAppointmentsData(response.data);
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

  const openDialogAppointment = (type, e) => {
    let row = e.target.parentElement.parentElement, //access the whole row of that element
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        Name: fields[3].innerText,
        Address: fields[4].innerText,
        Contacts: fields[5].innerText,
        Date: fields[6].innerText,
        Type: fields[7].innerText,
        Status: fields[8].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Name: fields[3].innerText,
        Id: checkedFields.Ids,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
    } else if (type === "delete marked") {
      setDialogFields({
        dialogTitle: "Delete Marked",

        Id: checkedFields.Ids,
      });

      setDialogType("delete marked");
      setIsDialogOpen(true);
    }
  };

  const handleAddAppointments = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Name", Name_input.current.value);
    formData.append("Address", Address_input.current.value);
    formData.append("Contacts", Contacts_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Status", Status_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/appointments.php",
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
          toast.success("Added successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setAppointmentsUpdate((prevState) => {
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

  const handleUpdateAppointments = (e, row_id) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Id", row_id);
    formData.append("Name", Name_input.current.value);
    formData.append("Address", Address_input.current.value);
    formData.append("Contacts", Contacts_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Status", Status_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/appointments/editAppointments.php",
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

          setAppointmentsUpdate((prevState) => {
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

  const handleDeleteAppointments = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/appointments/deleteAppointments.php",
      params: { id: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setAppointmentsUpdate((prevState) => {
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

  const handleDeleteMarkedAppointments = (e, Ids) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/appointments/deleteMarkedAppointments.php",
      params: { checkedIds: Ids },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setBoxMarked(false);
          setCheckedFields({ Ids: [] });

          setAppointmentsUpdate((prevState) => {
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

  const handleCheckAll = (e) => {
    let row = e.target.parentElement.parentElement.parentElement.parentElement,
      fields = row.querySelectorAll("td"),
      td_fields = fields;
    if (e.target.checked == true) {
      td_fields.forEach((td) => {
        if (td.className == "mark_box_row") {
          let checkbox = td.querySelector("input");
          checkbox.checked = true;
          setBoxMarked(true);

          setCheckedFields((prevState) => {
            return {
              ...prevState,
              Ids: [...prevState.Ids, checkbox.id],
            };
          });
        }
      });
    } else {
      td_fields.forEach((td) => {
        if (td.className == "mark_box_row") {
          let checkbox = td.querySelector("input");
          checkbox.checked = false;
          setBoxMarked(false);
          setCheckedFields((prevState) => {
            return {
              ...prevState,
              Ids: [],
            };
          });
        }
      });
    }
  };

  const handleCheck = (e) => {
    let row = e.target.parentElement.parentElement.parentElement.parentElement,
      check_fields = row.querySelectorAll("input");

    if (e.target.checked) {
      setBoxMarked(true);
      setCheckedFields((prevState) => {
        return {
          ...prevState,
          Ids: [...prevState.Ids, e.target.id],
        };
      });
    } else {
      let countChecked = 0;
      check_fields[0].checked = false; //uncheck the parent checkbox
      check_fields.forEach((box) => {
        if (box.checked) {
          countChecked += 1;
        }
      });

      if (countChecked == 0) {
        check_fields[0].checked = false;
        setBoxMarked(false);
        setCheckedFields({ Ids: [] });
      } else {
        setCheckedFields((prevState) => {
          return {
            ...prevState,
            Ids: prevState.Ids.filter((id) => id !== e.target.id),
          };
        });
      }
    }
  };
  useEffect(() => {
    //Axios to get data from server

    axios({
      method: "get",
      params: { user_id: user },
      url: api_url + "/appointments/getAppointments.php",
    })
      .then((response) => {
        setAppointmentsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [appointmentsUpdate]);

  var count = 1, //Will increment the No. column of the table
    done_count = 0; //Will hold count for the done appointments
  appointmentsData.map((e) =>
    e.Status === "Done" ? done_count++ : done_count
  );
  return (
    <section id="active">
      <Sidebar />

      <div className="container">
        <Header />

        <div className="content_part project_content">
          {isLoading ? (
            <div className="loading_screen"></div>
          ) : (
            <>
              <div className="part_1">
                <div className="title_part">
                  <h2>My Appointments</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handleAppointmentSubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchAppointment}
                    />
                  </div>
                </form>
              </div>

              {boxMarked && (
                <div className="delete_marked">
                  <button
                    className="btn action_btn delete_btn"
                    onClick={(e) => openDialogAppointment("delete marked", e)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}

              <div className="part_3">
                <table className="appoints">
                  <thead>
                    <tr>
                      <th className="id">#</th>
                      <th className="mark_box">
                        <input
                          type="checkbox"
                          name="mark_all"
                          id="mark_all"
                          onChange={(e) => handleCheckAll(e)}
                        />
                      </th>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Contacts</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {appointmentsData.length != 0 ? (
                      appointmentsData.map((row) => (
                        <tr key={row.id}>
                          <td className="id">{row.id}</td>
                          <td className="mark_box_row">
                            <input
                              type="checkbox"
                              name="mark"
                              id={row.id}
                              onChange={(e) => handleCheck(e)}
                            />
                          </td>
                          <td>{count++}</td>
                          <td>{row.Name}</td>
                          <td>{row.Address}</td>
                          <td>{row.Contacts}</td>
                          <td>{row.Date}</td>
                          <td>{row.Type}</td>
                          <td
                            className={
                              row.Status === "Done"
                                ? "completed"
                                : row.Status === "Pending"
                                ? "pending"
                                : row.Status === "Cancelled"
                                ? "failed"
                                : ""
                            }
                          >
                            <span>{row.Status}</span>
                          </td>
                          <td className="actions">
                            <button
                              className="btn action_btn"
                              onClick={(e) => openDialogAppointment("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) =>
                                openDialogAppointment("delete", e)
                              }
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={10}>
                          No Appointments Found! Please Add Row
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="summary_part">
                <div className="summary_1">
                  <p>Total Appointments: {appointmentsData.length}</p>
                </div>

                <div className="summary_2">
                  <p>Total Done: {done_count}</p>
                </div>

                <div className="summary_2">
                  <p>Total Pending: {appointmentsData.length - done_count}</p>
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
              <h2>{dialogFields.dialogTitle} Appointment</h2>
            </div>

            <div className="form_part contacts_form">
              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateAppointments(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Appointment Name"
                        defaultValue={dialogFields.Name}
                        ref={Name_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Appointment Address"
                        defaultValue={dialogFields.Address}
                        ref={Address_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="contacts">Contacts</label>
                      <input
                        type="text"
                        name="contacts"
                        id="contacts"
                        placeholder="contacts Number / Email..."
                        defaultValue={dialogFields.Contacts}
                        ref={Contacts_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date}
                        ref={Date_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Appointment Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Work">Work</option>
                          <option value="Personal">Personal</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="status">Appointment Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_4">
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
                  onSubmit={(e) => handleAddAppointments(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Appointment Name"
                        defaultValue={dialogFields.Name}
                        ref={Name_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Appointment Address"
                        defaultValue={dialogFields.Address}
                        ref={Address_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="contacts">Contacts</label>
                      <input
                        type="text"
                        name="contacts"
                        id="contacts"
                        placeholder="contacts Number / Email..."
                        defaultValue={dialogFields.Contacts}
                        ref={Contacts_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date}
                        ref={Date_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Appointment Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Work">Work</option>
                          <option value="Personal">Personal</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="status">Appointment Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_4">
                    <div className="input_group">
                      <button type="submit" className="btn">
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              ) : dialogType === "delete marked" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) =>
                    handleDeleteMarkedAppointments(e, dialogFields.Id)
                  }
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete the-{" "}
                      <span style={{ color: "red" }}>marked Project</span>
                    </h3>
                  </div>

                  <div className="input_group">
                    <button className="btn" type="submit">
                      Confirm
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleDeleteAppointments(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this Appointment -
                      <span style={{ color: "red" }}>{dialogFields.Name}</span>
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

export default Appointments;
