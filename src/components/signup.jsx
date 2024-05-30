import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api_url } from "../routes";

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
    check: "",
    response: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const username_ref = useRef(),
    email_ref = useRef(),
    psk_ref = useRef(),
    cpsk_ref = useRef(),
    check_ref = useRef(),
    signup_btn = useRef();

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

  const openDialogPolicy = () => {
    setIsDialogOpen(true);
  };
  const handleSignup = () => {
    //Validate the input fields
    const errors = {},
      email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username_ref.current.value === "") {
      errors.username = "Username Required";
    }

    if (email_ref.current.value === "") {
      errors.email = "Email Required";
    } else if (!email_ref.current.value.match(email_regex)) {
      errors.email = "Invalid Email";
    }

    if (psk_ref.current.value === "") {
      errors.password = "Password Required";
    }

    if (cpsk_ref.current.value === "") {
      errors.c_password = "Required";
    }

    if (psk_ref.current.value !== cpsk_ref.current.value) {
      errors.response = "Password Mismatch";
    }

    if (!check_ref.current.checked) {
      errors.check = "This is Required";
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

    const error_free = handleSignup();
    // console.log(error_free);

    if (error_free) {
      handleSignup();
      // // https://homesys.000webhostapp.com/PHP/signup.php
      // //https://homesys.000webhostapp.com/PHP/login.php
      // let api_url = "https://homesys.000webhostapp.com/PHP/signup.php";
      let formData = new FormData();
      formData.append("username", username_ref.current.value);
      formData.append("password", psk_ref.current.value);
      formData.append("email", email_ref.current.value);
      formData.append("terms_check", check_ref.current.checked);

      axios({
        method: "post",
        url: api_url + "/signup.php",
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

            signup_btn.current.innerText = "Loading...";
            signup_btn.current.disabled = true;

            toast.success("Registered Successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });

            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            setErrors({
              username: "",
              password: "",
              response: response.data,
            });

            toast.error(response.data, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((e) => {
          setErrors({
            username: "",
            password: "",
            response: e.message,
          });
        });
    }
  };

  const handleGoBack = () => {
    navigate("/login");
  };

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
          {errors.response !== "" ? (
            <span className="error_msg response_text">{errors.response}</span>
          ) : null}

          <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="grouping">
              <div className="input_group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                  ref={username_ref}
                  // {...formik.getFieldProps("username")}
                />
                {errors.username !== "" ? (
                  <span className="error_msg">{errors.username}</span>
                ) : null}
              </div>

              <div className="input_group">
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  placeholder="Email"
                  required
                  ref={email_ref}
                  // {...formik.getFieldProps("username")}
                />
                {errors.username !== "" ? (
                  <span className="error_msg">{errors.email}</span>
                ) : null}
              </div>
            </div>

            <div className="grouping">
              <div className="input_group">
                <input
                  type="password"
                  name="psk"
                  id="psk"
                  placeholder="Password"
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
                  placeholder="Confirm Password"
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
            </div>

            <div className="input_group">
              <div className="grouping check_group">
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  ref={check_ref}
                  required
                />
                <label htmlFor="check" className="check_label">
                  I Agree to the Terms & Privacy Policy
                </label>
              </div>

              {errors.check !== "" ? (
                <span className="error_msg">{errors.check}</span>
              ) : null}
            </div>

            <div className="input_group">
              <button
                type="submit"
                className="btn"
                onClick={handleSignup}
                ref={signup_btn}
              >
                Confirm Signup
              </button>
            </div>
          </form>
        </div>

        <div className="forgot_part">
          <p onClick={handleGoBack}>
            <i className="fa fa-arrow-left"></i> Back to Login{" "}
          </p>

          <p onClick={openDialogPolicy} className="view_policy">
            View Policy
          </p>
        </div>

        <ToastContainer />
      </div>
      {isDialogOpen && (
        <div className="dialog_container">
          <div className="dialog_box policy_dialog">
            <div className="close_part">
              <button
                className="btn close_btn"
                onClick={() => setIsDialogOpen(false)}
              >
                X
              </button>
            </div>

            <div className="title_part">
              <h2>HomeSys - Terms & Privacy Policy</h2>
            </div>

            <div className="content_part">
              <div className="part_1">
                <h3>Terms of Service</h3>
                <p>
                  Welcome to homesys! By registering and using our services, you
                  agree to the following terms:
                </p>
                <ol>
                  <li>
                    <strong>User Account:</strong> You are responsible for
                    maintaining the confidentiality of your username and
                    password. Any actions taken through your account are your
                    responsibility.
                  </li>
                  <li>
                    <strong>User Conduct:</strong> You agree to use homesys for
                    lawful purposes and to not engage in any activities that may
                    harm the system or other users.
                  </li>
                  <li>
                    <strong>Data Security:</strong> We prioritize the security
                    of your data. However, we cannot guarantee absolute
                    security. Please notify us immediately of any unauthorized
                    access to your account.
                  </li>
                  <li>
                    <strong>Forgotten Passwords:</strong> If you forget your
                    password, we will use your registered email address to
                    assist you in resetting it.
                  </li>
                  <li>
                    <strong>Service Availability:</strong> While we strive to
                    provide uninterrupted service, we may need to perform
                    maintenance or updates. We will notify you of any planned
                    disruptions.
                  </li>
                  <li>
                    <strong>Termination:</strong> We reserve the right to
                    suspend or terminate your account if you violate these terms
                    or engage in any inappropriate behavior.
                  </li>
                  <li>
                    <strong>Changes to Terms:</strong> We may update these terms
                    from time to time. By continuing to use homesys, you agree
                    to the revised terms.
                  </li>
                </ol>
              </div>

              <div className="part_2">
                <h3>Privacy Policy</h3>
                <p>
                  At homesys, we are committed to protecting your privacy.
                  Here's how we handle your personal information:
                </p>
                <ol>
                  <li>
                    <strong>Information Collection:</strong> We collect your
                    username, email, and password during the registration
                    process. We only use your email address to assist with
                    password recovery.
                  </li>
                  <li>
                    <strong>Data Usage:</strong> Your personal information is
                    used solely for the purpose of providing and improving our
                    services. We do not sell or share your information with
                    third parties.
                  </li>
                  <li>
                    <strong>Data Security:</strong> We employ industry-standard
                    security measures to safeguard your data against
                    unauthorized access, alteration, or disclosure.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We may use cookies to enhance your
                    user experience. You can adjust your browser settings to
                    reject cookies if you prefer.
                  </li>
                  <li>
                    <strong>Third-party Links:</strong> Our platform may contain
                    links to third-party websites. We are not responsible for
                    the privacy practices or content of these sites.
                  </li>
                  <li>
                    <strong>Children's Privacy:</strong> Homesys is not intended
                    for children under the age of 13. We do not knowingly
                    collect personal information from minors.
                  </li>
                  <li>
                    <strong>Policy Changes:</strong> We may update this privacy
                    policy to reflect changes in our practices or to comply with
                    legal requirements. We will notify you of any significant
                    changes.
                  </li>
                </ol>
              </div>

              <div className="part_3">
                <p>
                  If you have any questions or concerns about our terms or
                  privacy policy, please contact us at{" "}
                  <a href="mailto:jumagobe3@gmail.com">jumagobe3@gmail.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
