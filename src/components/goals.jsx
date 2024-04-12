import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
const Goals = () => {
  const [GoalsUpdate, setGoalsUpdate] = useState({
      updated: 0,
    }), //check if api has updated the Goalss
    [tableData, setTableData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({
      goalName: "",
      goalStatus: "",
      goalId: "",
    }),
    [error, setError] = useState(""),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const Goals = useRef();

  const newGoals = useRef(),
    newStatus = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleGoalsSubmit = (e) => {
    e.preventDefault();

    let Goals_val = Goals.current.value,
      api_url = "http://localhost:8080/HOMESYS V1.0/homesys/PHP/goals.php",
      formData = new FormData();

    formData.append("goal", Goals_val);

    axios({
      method: "post",
      url: api_url,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then((response) => {
        if (response.data === 1) {
          toast.success("Added, All the best 😉", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          Goals.current.value = "";

          setGoalsUpdate((prevState) => {
            return {
              ...prevState,
              updated: prevState.updated + 1,
            };
          });
        } else {
          toast.error("Less is best for productivity :)", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          Goals.current.value = "";
          setGoalsUpdate({
            updated: 0,
          });
        }
      })
      .catch((e) => {
        alert("Network Error");
      });
  };

  const handleDoneGoals = (e, goal_id) => {
    let row = e.target.parentElement.parentElement,
      table_fields = row.querySelectorAll("td"),
      goal_field = table_fields[3];

    axios({
      //Update the status in the database
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/goals/markGoals.php",
      params: { id: goal_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Congrats, Let's continue 😉", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          goal_field.classList.add("done");
          e.target.disabled = true; //Disable the done button
        } else {
          toast.error("Oops, Something's wrong :(", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          e.target.disabled = false;
        }
      })
      .catch((e) => {
        alert("Network Error", e);
      });
  };

  const openDialogGoals = (x, e) => {
    let row = e.target.parentElement.parentElement,
      fields = row.querySelectorAll("td");

    if (x === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        goalName: fields[3].innerText,
        goalStatus: fields[1].innerText,
        goalId: fields[0].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
      setError("");
    } else if (x === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        goalName: fields[3].innerText,
        goalId: fields[0].innerText,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
      setError("");
    }
  };

  const handleUpdateGoals = (e, goal_id) => {
    e.preventDefault();

    let new_Goals = newGoals.current.value,
      new_status = newStatus.current.value,
      formData = new FormData();

    formData.append("id", goal_id);
    formData.append("goal", new_Goals);
    formData.append("status", new_status);

    axios({
      //Update the new goal and status in the database
      method: "post",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/goals/updateGoals.php",
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

          setGoalsUpdate((prevState) => {
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

  const handleDeleteGoals = (e, goal_id) => {
    e.preventDefault();

    axios({
      //Delete the goal in the database
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/goals/deleteGoals.php",
      params: { id: goal_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setGoalsUpdate((prevState) => {
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
    //Axios to get Goals data

    axios({
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/goals/getGoals.php",
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
  }, [GoalsUpdate]);

  return (
    <>
      <section id="active">
        <Sidebar />

        <div className="container">
          <Header />

          <div className="content_part todo_content">
            {isLoading ? (
              <div className="loading_screen"></div>
            ) : (
              <>
                <div className="part_1">
                  <div className="title_part">
                    <h2>My Goals</h2>
                  </div>

                  <div className="date_part">
                    <h2>Date: {GetDate()}</h2>
                  </div>
                </div>

                <div className="part_2">
                  <form className="todo_form" onSubmit={handleGoalsSubmit}>
                    <div className="input_group">
                      <input
                        type="text"
                        name="Goals"
                        id="Goals"
                        placeholder="Enter New Goal To Achieve..."
                        required
                        ref={Goals}
                      />
                    </div>
                  </form>
                </div>

                <div className="part_3">
                  <table className="todo">
                    <thead>
                      <tr>
                        <th className="id">#</th>
                        <th className="id status">Status</th>
                        <th>Mark</th>
                        <th>Goal Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody className="table_content">
                      {tableData.length !== 0 ? (
                        tableData.map((row) => (
                          <tr key={row.id}>
                            <td className="id">{row.id}</td>
                            <td className="id">{row.status}</td>
                            <td>
                              <button
                                className="btn action_btn"
                                disabled={
                                  row.status == "Achieved" ? true : false
                                }
                                onClick={(e) => handleDoneGoals(e, row.id)}
                              >
                                Achieved
                              </button>
                            </td>
                            <td
                              className={row.status == "Achieved" ? "done" : ""}
                            >
                              {row.goal}
                            </td>
                            <td className="actions">
                              <button
                                className="btn action_btn"
                                onClick={(e) => openDialogGoals("edit", e)}
                              >
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button
                                className="btn action_btn delete_btn"
                                onClick={(e) => openDialogGoals("delete", e)}
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="not_found" colSpan={3}>
                            No Goals so far!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                <h2>{dialogFields.dialogTitle} Goal</h2>
              </div>

              <div className="form_part">
                {error !== "" ? (
                  <span className="error_msg">{error}</span>
                ) : null}

                {dialogType === "edit" ? (
                  <form
                    className="dialog_form"
                    onSubmit={(e) => handleUpdateGoals(e, dialogFields.goalId)}
                  >
                    <div className="input_group">
                      <label htmlFor="Goals_val">Goal Name</label>
                      <input
                        type="text"
                        name="Goals"
                        id="Goals_val"
                        placeholder="Update goal..."
                        defaultValue={dialogFields.goalName}
                        required
                        ref={newGoals}
                      />
                    </div>
                    <div className="input_group">
                      <label htmlFor="status_val">Goal Status</label>

                      <div className="custom_select">
                        <select
                          name="Goals"
                          id="status_val"
                          defaultValue={dialogFields.goalStatus}
                          required
                          ref={newStatus}
                        >
                          <option value="Achieved">Achieved</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                    <div className="input_group">
                      <button className="btn" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="dialog_form"
                    onSubmit={(e) => handleDeleteGoals(e, dialogFields.goalId)}
                  >
                    <div className="input_group">
                      <h3>
                        Are you sure you want to delete this goal -{" "}
                        <span style={{ color: "red" }}>
                          {dialogFields.goalName}
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
    </>
  );
};

export default Goals;
