import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({}),
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
        url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects/projectSearch.php",
        data: formData,
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
        url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects/getProjects.php",
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
        Title: fields[2].innerText,
        Description: fields[3].innerText,
        Type: fields[4].innerText,
        Date_Started: fields[5].innerText,
        Date_Finished: fields[6].innerText,
        Status: fields[7].innerText,
        Link: fields[8].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
      setError("");
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Id: fields[0].innerText,
        Title: fields[2].innerText,
      });

      setDialogType("delete");
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
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects.php",
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
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects/editProjects.php",
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
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects/deleteProjects.php",
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
  useEffect(() => {
    //Axios to get todo data

    axios({
      method: "get",
      url: "http://localhost:8080/HOMESYS V1.0/homesys/PHP/projects/getProjects.php",
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
  projectsData.map((e) =>
    e.Status === "Completed" ? completed_count++ : completed_count
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

              <div className="part_3">
                <table className="projects">
                  <thead>
                    <tr>
                      <th className="id">#</th>
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
                        <td className="not_found" colSpan={8}>
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
