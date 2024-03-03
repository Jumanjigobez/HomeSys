import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
const Todo = () => {
  const [todoUpdate, setTodoUpdate] = useState({
      updated: 0,
    }), //check if api has updated the todos
    [tableData, setTableData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({
      taskName: "",
      taskStatus: "",
      taskId: "",
    }),
    [error, setError] = useState(""),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const Todo = useRef();

  const newTodo = useRef(),
    newStatus = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();

    let Todo_val = Todo.current.value,
      api_url = "http://localhost:8080/HOMESYS V1.0/homesys/PHP/todo.php",
      formData = new FormData();

    formData.append("Todo", Todo_val);

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
          Todo.current.value = "";

          setTodoUpdate((prevState) => {
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
          Todo.current.value = "";
          setTodoUpdate({
            updated: 0,
          });
        }
      })
      .catch((e) => {
        alert("Network Error");
      });
  };

  const handleDoneTodo = (e, task_id) => {
    let row = e.target.parentElement.parentElement,
      table_fields = row.querySelectorAll("td"),
      task_field = table_fields[3];

    axios({
      //Update the status in the database
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/todo/markTodos.php",
      params: { id: task_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Congrats, Let's continue 😉", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          task_field.classList.add("done");
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

  const openDialogTodo = (x, e) => {
    let row = e.target.parentElement.parentElement,
      fields = row.querySelectorAll("td");

    if (x === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        taskName: fields[3].innerText,
        taskStatus: fields[1].innerText,
        taskId: fields[0].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
      setError("");
    } else if (x === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        taskName: fields[3].innerText,
        taskId: fields[0].innerText,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
      setError("");
    }
  };

  const handleUpdateTodo = (e, task_id) => {
    e.preventDefault();

    let new_todo = newTodo.current.value,
      new_status = newStatus.current.value,
      formData = new FormData();

    formData.append("id", task_id);
    formData.append("task", new_todo);
    formData.append("status", new_status);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/todo/updateTodos.php",
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

          setTodoUpdate((prevState) => {
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

  const handleDeleteTodo = (e, task_id) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/todo/deleteTodos.php",
      params: { id: task_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setTodoUpdate((prevState) => {
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
    //Axios to get todo data

    axios({
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/todo/getTodos.php",
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
  }, [todoUpdate]);

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
                    <h2>My ToDo</h2>
                  </div>

                  <div className="date_part">
                    <h2>Date: {GetDate()}</h2>
                  </div>
                </div>

                <div className="part_2">
                  <form className="todo_form" onSubmit={handleTodoSubmit}>
                    <div className="input_group">
                      <input
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Enter New To Do..."
                        required
                        ref={Todo}
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
                        <th>Task Name</th>
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
                                disabled={row.status === "Done" ? true : false}
                                onClick={(e) => handleDoneTodo(e, row.id)}
                              >
                                Done
                              </button>
                            </td>
                            <td className={row.status === "Done" ? "done" : ""}>
                              {row.task}
                            </td>
                            <td className="actions">
                              <button
                                className="btn action_btn"
                                onClick={(e) => openDialogTodo("edit", e)}
                              >
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button
                                className="btn action_btn delete_btn"
                                onClick={(e) => openDialogTodo("delete", e)}
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="not_found" colSpan={3}>
                            No Task Today
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
                <h2>{dialogFields.dialogTitle} ToDo Task</h2>
              </div>

              <div className="form_part">
                {error !== "" ? (
                  <span className="error_msg">{error}</span>
                ) : null}

                {dialogType === "edit" ? (
                  <form
                    className="dialog_form"
                    onSubmit={(e) => handleUpdateTodo(e, dialogFields.taskId)}
                  >
                    <div className="input_group">
                      <label htmlFor="todo_val">Task Name</label>
                      <input
                        type="text"
                        name="todo"
                        id="todo_val"
                        placeholder="Update task..."
                        defaultValue={dialogFields.taskName}
                        required
                        ref={newTodo}
                      />
                    </div>
                    <div className="input_group">
                      <label htmlFor="status_val">Task Status</label>

                      <div className="custom_select">
                        <select
                          name="todo"
                          id="status_val"
                          defaultValue={dialogFields.taskStatus}
                          required
                          ref={newStatus}
                        >
                          <option value="Done">Done</option>
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
                    onSubmit={(e) => handleDeleteTodo(e, dialogFields.taskId)}
                  >
                    <div className="input_group">
                      <h3>
                        Are you sure you want to delete this task -{" "}
                        <span style={{ color: "red" }}>
                          {dialogFields.taskName}
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

export default Todo;
