import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api_url } from "../routes";

const ResetPsk = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    password: "",
    c_password: "",
    response: "",
  });
  const [validLink, setValidLink] = useState([]);

  const psk_ref = useRef(),
    cpsk_ref = useRef(),
    email_ref = useRef(),
    reset_btn = useRef();

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

  const handleConfirmReset = () => {
    //Validate the input fields
    const errors = {};

    if (psk_ref.current.value === "") {
      errors.password = "Password Required";
    }

    if (cpsk_ref.current.value === "") {
      errors.c_password = "Required";
    }

    setErrors(errors);

    if (JSON.stringify(errors).length === 2) {
      //if there is no error proceed to submit, 2 is for the curly braces
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error_free = handleConfirmReset();
    // console.log(error_free);

    if (error_free) {
      handleConfirmReset();

      let formData = new FormData();
      formData.append("psk", psk_ref.current.value);
      formData.append("email", email_ref.current.value);

      reset_btn.current.innerText = "Resetting...";
      axios({
        method: "post",
        url: api_url + "/psk/confirm_reset.php",
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((response) => {
          if (response.data === 1) {
            //Meaning success

            reset_btn.current.disabled = true;

            toast.success("Password Reset Successfull👍", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });

            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            reset_btn.current.innerText = "Confirm Reset";

            setErrors({
              password: "",
              c_password: "",
              response: response.data,
            });

            // toast.error(response.data, {
            //   position: toast.POSITION.TOP_CENTER,
            //   autoClose: 3000,
            // });
          }
        })
        .catch((e) => {
          reset_btn.current.innerText = "Confirm Reset";
          setErrors({
            password: "",
            c_password: "",
            response: e.message,
          });
        });
    }
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  useEffect(() => {
    //Axios to get todo data

    axios({
      method: "get",
      url: api_url + "/psk/reset.php",
      params: { token: params.get("token"), email: params.get("email") },
    })
      .then((response) => {
        if (Array.isArray(response.data)) {
          //this means the link is valid and not expired

          setValidLink(response.data);
        } else {
          setValidLink([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //   console.log(validLink);
  return (
    <>
      <div id="login_form" className="signup_form">
        <div className="logo_part">
          <div className="logo">
            <img src="../images/logo.png" alt="Homesys Logo" />
          </div>

          <div className="title_part">
            <h1>HomeSys</h1>
          </div>
        </div>

        <div className="form_part">
          {validLink.length !== 0 ? (
            <>
              {errors.response !== "" ? (
                <span className="error_msg response_text">
                  {errors.response}
                </span>
              ) : null}

              <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                <div className="input_group">
                  <input
                    type="password"
                    name="psk"
                    id="psk"
                    placeholder="New Password"
                    ref={psk_ref}
                    onChange={handlePassword}
                    required
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
                    required
                    // {...formik.getFieldProps("password")}
                  />
                  {errors.password !== "" ? (
                    <span className="error_msg">{errors.c_password}</span>
                  ) : null}

                  <div className="show_psk2" onClick={(e) => handleViewpsk2(e)}>
                    <i className="fa-solid fa-eye-slash"></i>
                  </div>
                </div>
                <div className="input_group">
                  <input
                    type="email"
                    name="mail"
                    id="mail"
                    placeholder=""
                    hidden
                    defaultValue={params.get("email")}
                    ref={email_ref}
                  />
                </div>

                <div className="input_group">
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleConfirmReset}
                    ref={reset_btn}
                  >
                    Confirm Reset
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="invalid_link_container">
              <h3 style={{ color: "red" }}>Invalid Link</h3>
              <p>
                The link is invalid/expired. Either you did not copy the correct
                link, or you have already used the token in which case it is
                deactivated.
              </p>

              <p>
                Please, Go back to Login and click forgot password again to send
                a new reset link.
              </p>
            </div>
          )}
        </div>

        <div className="forgot_part">
          <button className="normal_btn" onClick={handleGoBack}>
            <i className="fa fa-arrow-left"></i> Back to Login{" "}
          </button>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default ResetPsk;
