import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import { useDispatch, useSelector } from "react-redux";

// import { sessionAdd } from "../store/actions";
// import {useFormik} from 'formik';
// import * as Yup from "yup";

const Login = () => {
  // const formik = useFormik({
  //     initialValues: {username: "",password: ""},
  //     validationSchema: Yup.object({
  //         username: Yup.string().required("Username Required").max(20, "Username Too Long"),
  //         password: Yup.string().required("Pasword Required").max(10, "Password Too Long")
  //     }),

  //     onSubmit: (values) =>{
  //         console.log(values)
  //     }
  // })

  // const session_state = useSelector(state => state.SessionReducer);
  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    response: "",
  });

  const sessions = { loggedIn: 0, username: "" };

  const username_ref = useRef();
  const psk_ref = useRef();
  const login_btn = useRef();

  const handlePassword = () => {
    let psk_length = psk_ref.current.value.length,
      show_btn = document.querySelector(".show_psk");

    if (psk_length >= 1) {
      show_btn.style.display = "block";
    } else {
      show_btn.style.display = "none";
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

  const handleLogin = () => {
    //Validate the input fields

    if (username_ref.current.value === "" && psk_ref.current.value === "") {
      setErrors({
        username: "Username Required",
        password: "Password Required",
      });
    } else if (username_ref.current.value === "") {
      setErrors({
        username: "Username Required",
        password: "",
      });
    } else if (psk_ref.current.value === "") {
      setErrors({
        username: "",
        password: "Password Required",
      });
    } else {
      setErrors({
        username: "",
        password: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin();

    let api_url = "http://localhost:80/homesys/PHP/login.php";
    let formData = new FormData();
    formData.append("username", username_ref.current.value);
    formData.append("password", psk_ref.current.value);

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
          //Meaning success

          login_btn.current.innerText = "Loading...";
          login_btn.current.disabled = true;

          sessions.loggedIn = 1; //Update the sessions object array
          sessions.username = username_ref.current.value;

          localStorage.setItem("sessions", JSON.stringify(sessions)); //Store in local storage

          // dispatch(sessionAdd(sessions.loggedIn, sessions.username))

          toast.success("Welcome Back", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/home");
            window.location.reload(); //Reload to remove any router bugs
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
          localStorage.setItem("sessions", JSON.stringify(sessions)); //Store in local storage
        }
      })
      .catch((e) => {
        setErrors({
          username: "",
          password: "",
          response: e.message,
        });
      });
  };

  useEffect(() => {
    //check if user already logged in
    if (
      localStorage.length !== 0 &&
      JSON.parse(localStorage.getItem("sessions")).username !== ""
    ) {
      navigate("./home");
    } else {
      navigate("/");
    }
  }, []);

  // console.log(JSON.parse(localStorage.getItem("sessions")))
  // console.log("From Global: ",session_state)
  return (
    <div id="login_form">
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
            <button
              type="submit"
              className="btn"
              onClick={handleLogin}
              ref={login_btn}
            >
              Login Now
            </button>
          </div>
        </form>
      </div>

      <div className="forgot_part">
        <p>Forgot Password ? </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
