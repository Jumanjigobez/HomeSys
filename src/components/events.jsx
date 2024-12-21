import { React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Events = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [EventsData, setEventsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [boxMarked, setBoxMarked] = useState(false),
    [checkedFields, setCheckedFields] = useState({
      Ids: [],
    }),
    [dialogFields, setDialogFields] = useState({});

  const [EventsUpdate, setEventsUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const Name_input = useRef(),
    Venue_input = useRef(),
    Date_input = useRef(),
    Contact_input = useRef(),
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

  const handleEventsubmit = (e) => {
    e.preventDefault();

    handleSearchEvents();
  };

  const handleSearchEvents = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/events/eventSearch.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setEventsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        params: { user_id: user },
        url: api_url + "/events/getEvents.php",
      })
        .then((response) => {
          setEventsData(response.data);
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

  const openDialogEvents = (type, e) => {
    let row = e.target.parentElement.parentElement, //access the whole row of that element
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        Name: fields[3].innerText,
        Venue: fields[4].innerText,
        Date: fields[5].innerText,
        Contact: fields[6].innerText,
        Type: fields[7].innerText,
        Status: fields[8].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Id: fields[0].innerText,
        Name: fields[3].innerText,
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

  const handleAddEvents = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Name", Name_input.current.value);
    formData.append("Venue", Venue_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Contact", Contact_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Status", Status_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/events.php",
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

          setEventsUpdate((prevState) => {
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

  const handleUpdateEvents = (e, row_id) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Id", row_id);
    formData.append("Name", Name_input.current.value);
    formData.append("Venue", Venue_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Contact", Contact_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Status", Status_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/events/editEvents.php",
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

          setEventsUpdate((prevState) => {
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

  const handleDeleteEvents = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/events/deleteEvents.php",
      params: { id: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setEventsUpdate((prevState) => {
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

  const handleDeleteMarkedEvents = (e, Ids) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/events/deleteMarkedEvents.php",
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

          setEventsUpdate((prevState) => {
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
      url: api_url + "/events/getEvents.php",
    })
      .then((response) => {
        setEventsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [EventsUpdate]);
  var count = 1, //Will increment the No. column of the table
    done_count = 0, //Will hold count for the done Events
    pending_count = 0; //Will hold count for the pending Events

  EventsData.map((e) => (e.Status === "Done" ? done_count++ : done_count));
  EventsData.map((e) =>
    e.Status === "Pending" ? pending_count++ : pending_count
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
                  <h2>My Events</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handleEventsubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchEvents}
                    />
                  </div>
                </form>
              </div>

              {boxMarked && (
                <div className="delete_marked">
                  <button
                    className="btn action_btn delete_btn"
                    onClick={(e) => openDialogEvents("delete marked", e)}
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
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Contact</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {EventsData.length != 0 ? (
                      EventsData.map((row) => (
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
                          <td>{row.Venue}</td>
                          <td>{row.Date}</td>
                          <td>{row.Contact}</td>
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
                              onClick={(e) => openDialogEvents("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) => openDialogEvents("delete", e)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={10}>
                          No Events Found! Please Add Row
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="summary_part">
                <div className="summary_1">
                  <p>Total Events: {EventsData.length}</p>
                </div>

                <div className="summary_2">
                  <p>Total Done: {done_count}</p>
                </div>

                <div className="summary_2">
                  <p>Total Pending: {pending_count}</p>
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
              <h2>{dialogFields.dialogTitle} Events</h2>
            </div>

            <div className="form_part contacts_form">
              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateEvents(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Events Name"
                        defaultValue={dialogFields.Name}
                        ref={Name_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Venue">Venue</label>
                      <input
                        type="text"
                        name="Venue"
                        id="Venue"
                        placeholder="Events Venue"
                        defaultValue={dialogFields.Venue}
                        ref={Venue_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="Date">Date</label>
                      <input
                        type="date"
                        name="Date"
                        id="Date"
                        placeholder="Event Date"
                        defaultValue={dialogFields.Date}
                        ref={Date_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="Event Contacts"
                        defaultValue={dialogFields.Contact}
                        ref={Contact_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Events Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Personal">Personal</option>
                          <option value="Work">Work</option>

                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="status">Events Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Done">Done</option>
                          <option value="Pending">Pending</option>

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
                  onSubmit={(e) => handleAddEvents(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Events Name"
                        defaultValue={dialogFields.Name}
                        ref={Name_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="Venue">Venue</label>
                      <input
                        type="text"
                        name="Venue"
                        id="Venue"
                        placeholder="Events Venue"
                        defaultValue={dialogFields.Venue}
                        ref={Venue_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="Date">Date</label>
                      <input
                        type="date"
                        name="Date"
                        id="Date"
                        placeholder="Event Date"
                        defaultValue={dialogFields.Date}
                        ref={Date_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="Event Contacts"
                        defaultValue={dialogFields.Contact}
                        ref={Contact_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Events Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Personal">Personal</option>
                          <option value="Work">Work</option>

                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="status">Events Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Done">Done</option>
                          <option value="Pending">Pending</option>

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
                  onSubmit={(e) => handleDeleteMarkedEvents(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete the-{" "}
                      <span style={{ color: "red" }}>marked Event</span>
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
                  onSubmit={(e) => handleDeleteEvents(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this Event -
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

export default Events;
