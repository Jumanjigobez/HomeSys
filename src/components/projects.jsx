import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Projects = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [projectsData, setProjectsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({}),
    [boxMarked, setBoxMarked] = useState(false),
    [checkedFields, setCheckedFields] = useState({
      Ids: [],
    }),
    [error, setError] = useState("");

  const [projectsUpdate, setProjectsUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const Title_input = useRef(),
    Description_input = useRef(),
    Type_input = useRef(),
    Date_input = useRef(),
    DateF_input = useRef(),
    Status_input = useRef(),
    Link_input = useRef(); //These ones will hold the input values referenced to

  const SearchTerm = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    handleSearchProject();
  };

  const handleSearchProject = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/projects/projectSearch.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setProjectsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        params: { user_id: user },
        url: api_url + "/projects/getProjects.php",
      })
        .then((response) => {
          setProjectsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const openDialogProject = (type, e) => {
    let row = e.target.parentElement.parentElement,
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        Title: fields[3].innerText,
        Description: fields[4].innerText,
        Type: fields[5].innerText,
        Date_Started: fields[6].innerText,
        Date_Finished: fields[7].innerText,
        Status: fields[8].innerText,
        Link: fields[9].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
      setError("");
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Title: fields[3].innerText,
        Id: checkedFields.Ids,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
      setError("");
    } else if (type === "delete marked") {
      setDialogFields({
        dialogTitle: "Delete Marked",

        Id: checkedFields.Ids,
      });

      setDialogType("delete marked");
      setIsDialogOpen(true);
      setError("");
    }
  };

  const openDialogAdd = () => {
    //When the Add Row button is Clicked
    setDialogFields({
      dialogTitle: "Add",
    });

    setDialogType("add");
    setIsDialogOpen(true);
  };

  const handleAddProject = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("Title", Title_input.current.value);
    formData.append("Description", Description_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Date_Started", Date_input.current.value);
    formData.append("Date_Finished", DateF_input.current.value);
    formData.append("Status", Status_input.current.value);
    formData.append("Link", Link_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/projects.php",
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

          setProjectsUpdate((prevState) => {
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

  const handleUpdateProject = (e, row_id) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("Id", row_id);
    formData.append("Title", Title_input.current.value);
    formData.append("Description", Description_input.current.value);
    formData.append("Type", Type_input.current.value);
    formData.append("Date_Started", Date_input.current.value);
    formData.append("Date_Finished", DateF_input.current.value);
    formData.append("Status", Status_input.current.value);
    formData.append("Link", Link_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/projects/editProjects.php",
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

          setProjectsUpdate((prevState) => {
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

  const handleDeleteProject = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/projects/deleteProjects.php",
      params: { id: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setProjectsUpdate((prevState) => {
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

  const handleDeleteMarkedProjects = (e, Ids) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/projects/deleteMarkedProjects.php",
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

          setProjectsUpdate((prevState) => {
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
      url: api_url + "/projects/getProjects.php",
    })
      .then((response) => {
        setProjectsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [projectsUpdate]);

  var count = 1, //Will increment the No. column of the table
    completed_count = 0; //Will hold count for the completed projects
  if (Array.isArray(projectsData)) {
    projectsData.map((e) =>
      e.Status === "Completed" ? completed_count++ : completed_count
    );
  }

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
                  <h2>My Projects</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handleProjectSubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchProject}
                    />
                  </div>
                </form>
              </div>

              {boxMarked && (
                <div className="delete_marked">
                  <button
                    className="btn action_btn delete_btn"
                    onClick={(e) => openDialogProject("delete marked", e)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}

              <div className="part_3">
                <table className="projects">
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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Date Started</th>
                      <th>Date Finished</th>
                      <th>Status</th>
                      <th>Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {projectsData.length != 0 ? (
                      projectsData.map((row) => (
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
                          <td>{row.Title}</td>
                          <td>{row.Description}</td>
                          <td>{row.Type}</td>
                          <td>{row.Date_Started}</td>
                          <td>{row.Date_Finished}</td>
                          <td
                            className={
                              row.Status === "Completed"
                                ? "completed"
                                : "pending"
                            }
                          >
                            <span>{row.Status}</span>
                          </td>
                          <td>
                            <a href={row.Link} target="_blank" rel="noreferrer">
                              {row.Link}
                            </a>
                          </td>
                          <td className="actions">
                            <button
                              className="btn action_btn"
                              onClick={(e) => openDialogProject("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) => openDialogProject("delete", e)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={10}>
                          No Projects Found! Please Add Row
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div class="summary_part">
                <div class="summary_1">
                  <p>Total Projects: {projectsData.length}</p>
                </div>

                <div class="summary_2">
                  <p>Total Completed: {completed_count}</p>
                </div>

                <div class="summary_2">
                  <p>
                    Total InComplete: {projectsData.length - completed_count}
                  </p>
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
          <div className="dialog_box project_dialog">
            <div className="close_part">
              <button
                className="btn close_btn"
                onClick={() => setIsDialogOpen(false)}
              >
                X
              </button>
            </div>

            <div className="title_part">
              <h2>{dialogFields.dialogTitle} Project</h2>
            </div>

            <div className="form_part project_form">
              {error !== "" ? <span className="error_msg">{error}</span> : null}

              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateProject(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="child">
                      <div className="input_group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="Title"
                          id="title"
                          placeholder="Title"
                          defaultValue={dialogFields.Title}
                          required
                          ref={Title_input}
                        />
                      </div>

                      <div
                        className="input_group"
                        style={{ marginTop: "1rem" }}
                      >
                        <label htmlFor="type">Type</label>
                        <div className="custom_select">
                          <select
                            name="type"
                            id="type"
                            defaultValue={dialogFields.Type}
                            required
                            ref={Type_input}
                          >
                            <option value="Personal">Personal</option>
                            <option value="Client">Client</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="Description"
                        id="description"
                        cols="30"
                        rows="10"
                        placeholder="Brief description..."
                        defaultValue={dialogFields.Description}
                        required
                        ref={Description_input}
                      ></textarea>
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="date">Date Started</label>
                      <input
                        type="date"
                        name="Date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date_Started}
                        required
                        ref={Date_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="date">Date Finished</label>
                      <input
                        type="date"
                        name="Date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date_Finished}
                        ref={DateF_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="status">Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="link">Link</label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        placeholder="Paste Link"
                        required
                        defaultValue={dialogFields.Link}
                        ref={Link_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
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
                  onSubmit={(e) => handleAddProject(e)}
                >
                  <div className="part_1">
                    <div className="child">
                      <div className="input_group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="Title"
                          id="title"
                          placeholder="Title"
                          defaultValue={dialogFields.Title}
                          required
                          ref={Title_input}
                        />
                      </div>

                      <div
                        className="input_group"
                        style={{ marginTop: "1rem" }}
                      >
                        <label htmlFor="type">Type</label>
                        <div className="custom_select">
                          <select
                            name="type"
                            id="type"
                            defaultValue={dialogFields.Type}
                            required
                            ref={Type_input}
                          >
                            <option value="Personal">Personal</option>
                            <option value="Client">Client</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="Description"
                        id="description"
                        cols="30"
                        rows="10"
                        placeholder="Brief description..."
                        defaultValue={dialogFields.Description}
                        required
                        ref={Description_input}
                      ></textarea>
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="date">Date Started</label>
                      <input
                        type="date"
                        name="Date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date_Started}
                        required
                        ref={Date_input}
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="date">Date Finished</label>
                      <input
                        type="date"
                        name="Date"
                        id="date"
                        placeholder="Date"
                        defaultValue={dialogFields.Date_Finished}
                        ref={DateF_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="status">Status</label>
                      <div className="custom_select">
                        <select
                          name="status"
                          id="status"
                          defaultValue={dialogFields.Status}
                          required
                          ref={Status_input}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="input_group">
                      <label htmlFor="link">Link</label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        placeholder="Paste Link"
                        required
                        defaultValue={dialogFields.Link}
                        ref={Link_input}
                      />
                    </div>
                  </div>

                  <div className="part_3">
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
                    handleDeleteMarkedProjects(e, dialogFields.Id)
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
                  onSubmit={(e) => handleDeleteProject(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this Project -{" "}
                      <span style={{ color: "red" }}>{dialogFields.Title}</span>
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

export default Projects;
