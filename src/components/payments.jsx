import { React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { api_url } from "../routes";

const Payments = () => {
  const user = JSON.parse(localStorage.getItem("sessions")).user_id;

  const [PaymentsData, setPaymentsData] = useState([]),
    [isDialogOpen, setIsDialogOpen] = useState(false),
    [dialogType, setDialogType] = useState(""),
    [boxMarked, setBoxMarked] = useState(false),
    [checkedFields, setCheckedFields] = useState({
      Ids: [],
    }),
    [dialogFields, setDialogFields] = useState({});

  const [PaymentsUpdate, setPaymentsUpdate] = useState({
      updated: 0,
    }),
    [isLoading, setIsLoading] = useState(true); //For loading screen when page is changed

  const SearchTerm = useRef();

  const TransCode_input = useRef(),
    AccNo_input = useRef(),
    AccName_input = useRef(),
    Amount_input = useRef(),
    Date_input = useRef(),
    Type_input = useRef();

  const GetDate = () => {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1,
      year = today.getFullYear();

    let date = day + "/" + month + "/" + year;

    return date;
  };

  const handlePaymentsubmit = (e) => {
    e.preventDefault();

    handleSearchPayment();
  };

  const handleSearchPayment = () => {
    if (SearchTerm.current.value.length >= 1) {
      let formData = new FormData();

      formData.append("search_term", SearchTerm.current.value);

      axios({
        method: "post",
        url: api_url + "/payments/paymentSearch.php",
        data: formData,
        params: { user_id: user },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          setPaymentsData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios({
        method: "get",
        params: { user_id: user },
        url: api_url + "/payments/getPayments.php",
      })
        .then((response) => {
          setPaymentsData(response.data);
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

  const openDialogPayment = (type, e) => {
    let row = e.target.parentElement.parentElement, //access the whole row of that element
      fields = row.querySelectorAll("td");

    if (type === "edit") {
      setDialogFields({
        dialogTitle: "Edit",
        Id: fields[0].innerText,
        TransCode: fields[3].innerText,
        AccNo: fields[4].innerText,
        AccName: fields[5].innerText,
        Amount: fields[6].innerText,
        Date: fields[7].innerText,
        Type: fields[8].innerText,
      });

      setDialogType("edit");
      setIsDialogOpen(true);
    } else if (type === "delete") {
      setDialogFields({
        dialogTitle: "Delete",
        TransCode: fields[3].innerText,
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

  const handleAddPayments = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("TransCode", TransCode_input.current.value);
    formData.append("AccNo", AccNo_input.current.value);
    formData.append("AccName", AccName_input.current.value);
    formData.append("Amount", Amount_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Type", Type_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/payments.php",
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

          setPaymentsUpdate((prevState) => {
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
  const handleUpdatePayments = (e, row_id) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("Id", row_id);
    formData.append("TransCode", TransCode_input.current.value);
    formData.append("AccNo", AccNo_input.current.value);
    formData.append("AccName", AccName_input.current.value);
    formData.append("Amount", Amount_input.current.value);
    formData.append("Date", Date_input.current.value);
    formData.append("Type", Type_input.current.value);

    axios({
      //Update the new task and status in the database
      method: "post",
      url: api_url + "/payments/editPayments.php",
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

          setPaymentsUpdate((prevState) => {
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

  const handleDeletePayments = (e, row_id) => {
    e.preventDefault();

    axios({
      //Delete the row in the database
      method: "get",
      url: api_url + "/payments/deletePayments.php",
      params: { id: row_id },
      withCredentials: false,
    })
      .then((response) => {
        if (response.data == 1) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setPaymentsUpdate((prevState) => {
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

  const handleDeleteMarkedPayments = (e, Ids) => {
    e.preventDefault();

    axios({
      //Delete the task in the database
      method: "get",
      url: api_url + "/payments/deleteMarkedPayments.php",
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

          setPaymentsUpdate((prevState) => {
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
      url: api_url + "/payments/getPayments.php",
    })
      .then((response) => {
        setPaymentsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [PaymentsUpdate]);
  var count = 1, //Will increment the No. column of the table
    done_count = 0, //Will hold count for the done Payments
    Total_Amount = 0, //Will be shown on the table footer as a summary
    Total_Sent = 0,
    Total_Received = 0;

  if (Array.isArray(PaymentsData)) {
    PaymentsData.map(
      (e) => (Total_Amount += Number(e.Amount.replace(/,/g, "")))
    );

    PaymentsData.map((e) =>
      e.Type === "Sent"
        ? (Total_Sent += Number(e.Amount.replace(/,/g, "")))
        : (Total_Received += Number(e.Amount.replace(/,/g, "")))
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
                  <h2>My Payments</h2>
                </div>

                <div className="date_part">
                  <h2>Date: {GetDate()}</h2>
                </div>
              </div>

              <div className="part_2">
                <form
                  className="project_form"
                  onSubmit={(e) => handlePaymentsubmit(e)}
                >
                  <div className="input_group">
                    <input
                      type="text"
                      name="term"
                      id="term"
                      placeholder="Enter any Keyword or Digit..."
                      required
                      ref={SearchTerm}
                      onKeyUp={handleSearchPayment}
                    />
                  </div>
                </form>
              </div>

              {boxMarked && (
                <div className="delete_marked">
                  <button
                    className="btn action_btn delete_btn"
                    onClick={(e) => openDialogPayment("delete marked", e)}
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
                      <th>Trans. Code</th>
                      <th>Acc. No.</th>
                      <th>Acc. Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table_content">
                    {PaymentsData.length != 0 ? (
                      PaymentsData.map((row) => (
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
                          <td>{row.TransCode}</td>
                          <td>{row.AccNo}</td>
                          <td>{row.AccName}</td>
                          <td>
                            {Number(
                              row.Amount.replace(/,/g, "")
                            ).toLocaleString()}
                          </td>

                          <td>{row.Date}</td>
                          <td>{row.Type}</td>
                          <td className="actions">
                            <button
                              className="btn action_btn"
                              onClick={(e) => openDialogPayment("edit", e)}
                            >
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn action_btn delete_btn"
                              onClick={(e) => openDialogPayment("delete", e)}
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="not_found" colSpan={10}>
                          No Payments Found! Please Add Row
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="summary_part">
                <div className="summary_1">
                  <p>Payments Done: {PaymentsData.length}</p>
                </div>

                <div className="summary_2">
                  <p>Total Amounts: {Total_Amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="summary_part">
                <div className="summary_1">
                  <p>Amount Sent: {Total_Sent.toLocaleString()}</p>
                </div>

                <div className="summary_2">
                  <p>Amount Received: {Total_Received.toLocaleString()}</p>
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
              <h2>{dialogFields.dialogTitle} Payment</h2>
            </div>

            <div className="form_part contacts_form">
              {dialogType === "edit" ? (
                <form
                  className="dialog_form"
                  onSubmit={(e) => handleUpdatePayments(e, dialogFields.Id)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="TransCode">Trans. Code</label>
                      <input
                        type="text"
                        name="TransCode"
                        id="TransCode"
                        placeholder="Transaction Code"
                        defaultValue={dialogFields.TransCode}
                        ref={TransCode_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="accno">Acc. No.</label>
                      <input
                        type="text"
                        name="accno"
                        id="accno"
                        placeholder="Account No."
                        defaultValue={dialogFields.AccNo}
                        ref={AccNo_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="accname">Acc. Name</label>
                      <input
                        type="text"
                        name="accname"
                        id="accname"
                        placeholder="Account Name"
                        defaultValue={dialogFields.AccName}
                        ref={AccName_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="amount"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        defaultValue={dialogFields.Amount}
                        ref={Amount_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
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

                    <div className="input_group">
                      <label htmlFor="type">Payment Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Sent">Sent</option>
                          <option value="Received">Received</option>
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
                  onSubmit={(e) => handleAddPayments(e)}
                >
                  <div className="part_1">
                    <div className="input_group">
                      <label htmlFor="TransCode">Trans. Code</label>
                      <input
                        type="text"
                        name="TransCode"
                        id="TransCode"
                        placeholder="Transaction Code"
                        defaultValue={dialogFields.TransCode}
                        ref={TransCode_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="accno">Acc. No.</label>
                      <input
                        type="text"
                        name="accno"
                        id="accno"
                        placeholder="Account No."
                        defaultValue={dialogFields.AccNo}
                        ref={AccNo_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_2">
                    <div className="input_group">
                      <label htmlFor="accname">Acc. Name</label>
                      <input
                        type="text"
                        name="accname"
                        id="accname"
                        placeholder="Account Name"
                        defaultValue={dialogFields.AccName}
                        ref={AccName_input}
                        required
                      />
                    </div>

                    <div className="input_group">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        defaultValue={dialogFields.Amount}
                        ref={Amount_input}
                        required
                      />
                    </div>
                  </div>

                  <div className="part_3">
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

                    <div className="input_group">
                      <label htmlFor="type">Payment Type</label>
                      <div className="custom_select">
                        <select
                          name="type"
                          id="type"
                          defaultValue={dialogFields.Type}
                          required
                          ref={Type_input}
                        >
                          <option value="Sent">Sent</option>
                          <option value="Received">Received</option>
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
                    handleDeleteMarkedPayments(e, dialogFields.Id)
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
                  onSubmit={(e) => handleDeletePayments(e, dialogFields.Id)}
                >
                  <div className="input_group">
                    <h3>
                      Are you sure you want to delete this Payment of Reference
                      No. -
                      <span style={{ color: "red" }}>
                        {dialogFields.TransCode}
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

export default Payments;
