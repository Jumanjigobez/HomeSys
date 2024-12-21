import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Class_Timetable = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const navigate = useNavigate();

  const [timetableUpdate, setTimetableUpdate] = useState({
    updated: 0,
  });

  const [timetableData, setTimetableData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({}),
    [error, setError] = useState(""),
    [boxMarked, setBoxMarked] = useState(false),
    [checkedFields, setCheckedFields] = useState({
      Ids: [],
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const Start_input = useRef(),
    SPeriod_input = useRef(),
    End_input = useRef(),
    EPeriod_input = useRef(),
    Mon_input = useRef(),
    Tue_input = useRef(),
    Wed_input = useRef(),
    Thur_input = useRef(),
    Fri_input = useRef(); //These ones will hold the input values referenced to

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const GetDay = () => {
    let now = new Date(),
      days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      day = days[now.getDay()];

    return day;
  };

  const handleGoBack = () => {
    navigate("/timetables");
  };

  const openDialogAdd = () => {
    //When the Add Row button is Clicked
    setDialogFields({
      dialogTitle: "Add",
    });

    setDialogType("add");
    setIsDialogOpen(true);
  };

  const openDialogClassT = (x, e) => {
    let row = e.target.parentElement.parentElement,
      fields = row.querySelectorAll("td");

    if (x === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        Time: fields[2].innerText,
        Mon: fields[3].innerText,
        Tue: fields[4].innerText,
        Wed: fields[5].innerText,
        Thur: fields[6].innerText,
        Fri: fields[7].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
      setError("");
    } else if (x === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Id: fields[0].innerText,
        Time: fields[2].innerText,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
      setError("");
    } else if (x === "delete marked") {
      setDialogFields({
        dialogTitle: "Delete Marked",

        Id: checkedFields.Ids,
      });

      setDialogType("delete marked");
      setIsDialogOpen(true);
      setError("");
    }
  };

  const handleAddTimetable = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("Start", Start_input.current.value);
    formData.append("SPeriod", SPeriod_input.current.value);
    formData.append("End", End_input.current.value);
    formData.append("EPeriod", EPeriod_input.current.value);
    formData.append("Mon", Mon_input.current.value);
    formData.append("Tue", Tue_input.current.value);
    formData.append("Wed", Wed_input.current.value);
    formData.append("Thur", Thur_input.current.value);
    formData.append("Fri", Fri_input.current.value);

    axios({
      method: "post",
      url: api_url + "/classTimetable.php",
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

          setTimetableUpdate((prevState) => {
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
  const handleUpdateTimetable = (e, row_id) => {
    e.preventDefault();

    let new_start = Start_input.current.value,
      new_speriod = SPeriod_input.current.value,
      new_end = End_input.current.value,
      new_eperiod = EPeriod_input.current.value,
      new_Mon = Mon_input.current.value,
      new_Tue = Tue_input.current.value,
      new_Wed = Wed_input.current.value,
      new_Thur = Thur_input.current.value,
      new_Fri = Fri_input.current.value,
      formData = new FormData();

    formData.append("Id", row_id);
    formData.append("Start", new_start);
    formData.append("SPeriod", new_speriod);
    formData.append("End", new_end);
    formData.append("EPeriod", new_eperiod);
    formData.append("Mon", new_Mon);
    formData.append("Tue", new_Tue);
    formData.append("Wed", new_Wed);
    formData.append("Thur", new_Thur);
    formData.append("Fri", new_Fri);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/classTimetable/editClassTimetable.php",
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

          setTimetableUpdate((prevState) => {
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

  const handleDeleteTimetable = (e, row_Id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/classTimetable/deleteClassTimetable.php",
      params: { id: row_Id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setTimetableUpdate((prevState) => {
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

  const handleDeleteMarkedClassT = (e, Ids) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/classTimetable/deleteMarkedClassTimetable.php",
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

          setTimetableUpdate((prevState) => {
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
    //Axios to get todo data

    axios({
      method: "get",
      params: { user_id: user },
      url: api_url + "/classTimetable/getClassTimetable.php",
    })
      .then((response) => {
        setTimetableData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [timetableUpdate]);

  return (
    <section id="active">
      <Sidebar />

      <div className="container">
        <Header />

        <div className="content_part timetable_content">
          {isLoading ? (
            <div className="loading_screen"></div>
          ) : (
            <>
              <div className="part_1">
                <button className="btn" onClick={handleGoBack}>
                  Back
                </button>
              </div>

              <div className="part_2">
                <div className="title_part">
                  <div className="name">
                    <h2>Class Timetable</h2>
                  </div>

                  <div className="date_part">
                    <h2>
                      Day: {GetDay()}({GetDate()})
                    </h2>
                  </div>
                </div>

                {boxMarked && (
                  <div className="delete_marked">
                    <button
                      className="btn action_btn delete_btn"
                      onClick={(e) => openDialogClassT("delete marked", e)}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                )}

                <div className="table_part">
                  <table>
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
                        <th>Time</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WED</th>
                        <th>THUR</th>
                        <th>FRI</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {timetableData.length != 0 ? (
                        timetableData.map((row) => (
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
                            <td>
                              {row.Start}
                              {row.SPeriod} - {row.End}
                              {row.EPeriod}
                            </td>
                            <td>{row.Mon}</td>
                            <td>{row.Tue}</td>
                            <td>{row.Wed}</td>
                            <td>{row.Thur}</td>
                            <td>{row.Fri}</td>
                            <td className="actions">
                              <button
                                className="btn action_btn"
                                onClick={(e) => openDialogClassT("edit", e)}
                              >
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button
                                className="btn action_btn delete_btn"
                                onClick={(e) => openDialogClassT("delete", e)}
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="not_found" colSpan={9}>
                            Timetable is Empty! Please Add Row
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="button_part">
                  <button className="btn" onClick={openDialogAdd}>
                    Add Row
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
              <h2>{dialogFields.dialogTitle} Class Timetable</h2>
            </div>

            <div className="form_part timetable_form">
              {error !== "" ? <span className="error_msg">{error}</span> : null}

              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateTimetable(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="start">Start At</label>
                      <input
                        type="text"
                        name="Start"
                        id="start"
                        placeholder="00:00"
                        defaultValue={dialogFields.Time.substring(0, 5)}
                        required
                        ref={Start_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="speriod">Period Type</label>

                      <div className="custom_select">
                        <select
                          name="SPeriod"
                          id="speriod"
                          defaultValue={dialogFields.Time.substring(5, 7)}
                          required
                          ref={SPeriod_input}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="end">End At</label>
                      <input
                        type="text"
                        name="End"
                        id="end"
                        placeholder="00:00"
                        defaultValue={dialogFields.Time.substring(10, 15)}
                        required
                        ref={End_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="eperiod">Period Type</label>

                      <div className="custom_select">
                        <select
                          name="EPeriod"
                          id="eperiod"
                          defaultValue={dialogFields.Time.substring(15, 17)}
                          required
                          ref={EPeriod_input}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="mon">Mon</label>
                      <input
                        type="text"
                        name="Mon"
                        id="mon"
                        placeholder="Monday..."
                        defaultValue={dialogFields.Mon}
                        required
                        ref={Mon_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="tue">Tue</label>
                      <input
                        type="text"
                        name="Tue"
                        id="tue"
                        placeholder="Tuesday..."
                        defaultValue={dialogFields.Tue}
                        required
                        ref={Tue_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="wed">Wed</label>
                      <input
                        type="text"
                        name="Wed"
                        id="wed"
                        placeholder="Wednesday..."
                        defaultValue={dialogFields.Wed}
                        required
                        ref={Wed_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="thur">Thur</label>
                      <input
                        type="text"
                        name="Thur"
                        id="thur"
                        placeholder="Thursday..."
                        defaultValue={dialogFields.Thur}
                        required
                        ref={Thur_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="fri">Fri</label>
                      <input
                        type="text"
                        name="Fri"
                        id="fri"
                        placeholder="Friday..."
                        defaultValue={dialogFields.Fri}
                        required
                        ref={Fri_input}
                      />
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
                  onSubmit={(e) => handleAddTimetable(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="start">Start At</label>
                      <input
                        type="time"
                        name="Start"
                        id="start"
                        placeholder="00:00"
                        required
                        ref={Start_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="speriod">Period Type</label>
                      <div className="custom_select">
                        <select
                          name="SPeriod"
                          id="speriod"
                          required
                          ref={SPeriod_input}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="end">End At</label>
                      <input
                        type="time"
                        name="End"
                        id="end"
                        placeholder="00:00"
                        required
                        ref={End_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="eperiod">Period Type</label>
                      <div className="custom_select">
                        <select
                          name="EPeriod"
                          id="eperiod"
                          required
                          ref={EPeriod_input}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="mon">Mon</label>
                      <input
                        type="text"
                        name="Mon"
                        id="mon"
                        placeholder="Monday..."
                        required
                        ref={Mon_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="tue">Tue</label>
                      <input
                        type="text"
                        name="Tue"
                        id="tue"
                        placeholder="Tuesday..."
                        required
                        ref={Tue_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="wed">Wed</label>
                      <input
                        type="text"
                        name="Wed"
                        id="wed"
                        placeholder="Wednesday..."
                        required
                        ref={Wed_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="thur">Thur</label>
                      <input
                        type="text"
                        name="Thur"
                        id="thur"
                        placeholder="Thursday..."
                        required
                        ref={Thur_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="fri">Fri</label>
                      <input
                        type="text"
                        name="Fri"
                        id="fri"
                        placeholder="Friday..."
                        required
                        ref={Fri_input}
                      />
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
                  onSubmit={(e) => handleDeleteMarkedClassT(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete the-{" "}
                      <span style={{ color: "red" }}>marked task</span>
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
                  onSubmit={(e) => handleDeleteTimetable(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this row where time is at
                      -<span style={{ color: "red" }}>{dialogFields.Time}</span>
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

export default Class_Timetable;
