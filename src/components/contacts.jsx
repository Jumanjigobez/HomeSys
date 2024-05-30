import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Contacts = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [contactsData, setContactsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [dialogFields, setDialogFields] = useState({});

  const [contactsUpdate, setContactsUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const Name_input = useRef(),
    Address_input = useRef(),
    Phone_input = useRef(),
    Email_input = useRef(),
    Type_input = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    handleSearchContact();
  };

  const handleSearchContact = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/contacts/contactSearch.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setContactsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        params: { user_id: user },
        url: api_url + "/contacts/getContacts.php",
      })
        .then((response) => {
          setContactsData(response.data);
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

  const openDialogContact = (type, e) => {
    let row = e.target.parentElement.parentElement, //access the whole row of that element
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        Name: fields[2].innerText,
        Address: fields[3].innerText,
        Phone: fields[4].innerText,
        Email: fields[5].innerText,
        Type: fields[6].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        Id: fields[0].innerText,
        Name: fields[2].innerText,
      });

      setDialogType("delete");
      setIsDialogOpen(true);
    }
  };

  const handleAddContacts = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Name", Name_input.current.value);
    formData.append("Address", Address_input.current.value);
    formData.append("Phone", Phone_input.current.value);
    formData.append("Email", Email_input.current.value);
    formData.append("Type", Type_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/contacts.php",
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

          setContactsUpdate((prevState) => {
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
  const handleUpdateContacts = (e, row_id) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Id", row_id);
    formData.append("Name", Name_input.current.value);
    formData.append("Address", Address_input.current.value);
    formData.append("Phone", Phone_input.current.value);
    formData.append("Email", Email_input.current.value);
    formData.append("Type", Type_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/contacts/editContacts.php",
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

          setContactsUpdate((prevState) => {
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

  const handleDeleteContacts = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/contacts/deleteContacts.php",
      params: { id: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setContactsUpdate((prevState) => {
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
      params: { user_id: user },
      url: api_url + "/contacts/getContacts.php",
    })
      .then((response) => {
        setContactsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [contactsUpdate]);

  var count = 1; //Will increment the No. column of the table
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
                  <h2>My Contacts</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handleContactSubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchContact}
                    />
                  </div>
                </form>
              </div>

              <div className="part_3">
                <table className="contacts">
                  <thead>
                    <tr>
                      <th className="id">#</th>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {contactsData.length != 0 ? (
                      contactsData.map((row) => (
                        <tr key={row.id}>
                          <td className="id">{row.id}</td>
                          <td>{count++}</td>
                          <td>{row.Name}</td>
                          <td>{row.Address}</td>
                          <td>
                            <a href={`tel:${row.Phone}`} rel="noreferrer">
                              {row.Phone}
                            </a>
                          </td>
                          <td>
                            <a href={`mailto:${row.Email}`} rel="noreferrer">
                              {row.Email}
                            </a>
                          </td>
                          <td>{row.Type}</td>
                          <td className="actions">
                            <button
                              className="btn action_btn"
                              onClick={(e) => openDialogContact("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) => openDialogContact("delete", e)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={8}>
                          No Contacts Found! Please Add Row
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="summary_part">
                <div class="summary_1">
                  <p>Total Contacts: {contactsData.length}</p>
                </div>

                <div class="summary_2"></div>
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
              <h2>{dialogFields.dialogTitle} Contact</h2>
            </div>

            <div className="form_part contacts_form">
              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdateContacts(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Contact's Name"
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
                        placeholder="Contact's Address"
                        defaultValue={dialogFields.Address}
                        ref={Address_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        min={0}
                        maxLength={11}
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        defaultValue={dialogFields.Phone}
                        ref={Phone_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        defaultValue={dialogFields.Email}
                        ref={Email_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Contact Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Family">Family</option>
                          <option value="Friend">Friend</option>
                          <option value="Work">Work</option>
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
                  onSubmit={(e) => handleAddContacts(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Contact's Name"
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
                        placeholder="Contact's Address"
                        defaultValue={dialogFields.Address}
                        ref={Address_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        min={0}
                        maxLength={11}
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        defaultValue={dialogFields.Phone}
                        ref={Phone_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        defaultValue={dialogFields.Email}
                        ref={Email_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
                    <div className="input_group">
                      <label htmlFor="type">Contact Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Family">Family</option>
                          <option value="Friend">Friend</option>
                          <option value="Work">Work</option>
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
              ) : (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleDeleteContacts(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this Contact -
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

export default Contacts;
