import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { env } from "../config";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  let navigate = useNavigate();

  //Alert function;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.email === "") {
        errors.email = "Please enter email";
      }
      if (values.password === "") {
        errors.password = "Please enter password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(`${env.api}/users/login`, values);
        console.log(loginData);

        if (loginData.data.token) {
          if (loginData.status === 200) {
            navigate("/portal/home");
            window.localStorage.setItem("app-token", loginData.data.token);
            window.localStorage.setItem("userid", loginData.data.user._id);
            window.localStorage.setItem(
              "username",
              loginData.data.user.username
            );
            window.localStorage.setItem("useremail", loginData.data.user.email);
          }
        } else {
          alert(loginData.data.msg);
        }
      } catch (error) {
        Toast.fire({ icon: "error", title: `${error.response.data.msg}` });
      }
    },
  });

  return (
    <div className="container-fluid login bg-hero pt-5">
     
      <span className="row d-flex align-content-center justify-content-center ">
        <span className="col-md-6 pt-5 ">
          <div className="card o-hidden border-1 shadow-lg transp pt-4 d-flex align-content-center">
            <div className="card-body p-2">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <div className="p-0">
                    <div className="text-center pb-2 text-uppercase letter-spacing1">
                      <h4 className="">Login Form</h4>
                    </div>

                    <form className="user" onSubmit={formik.handleSubmit}>
                      <div className="form-group pb-3">
                        <input
                          className={`form-control int bg-transparent text-white ${
                            formik.errors.email ? `input-error` : ``
                          }`}
                          id="exampleInputEmail"
                          type={"email"}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          name="email"
                          placeholder="Enter Email Address..."
                        />
                        <span style={{ color: "red" }}>
                          {formik.errors.email}
                        </span>
                      </div>
                      <div className="form-group pb-4">
                        <input
                          className={`form-control int bg-transparent text-white ${
                            formik.errors.password ? `input-error` : ``
                          }`}
                          id="exampleInputPassword"
                          type={"password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          placeholder="Password"
                          name="password"
                        />
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-login btn-secondary container fw-bold myname"
                        // onClick={login}
                      >
                        LOGIN
                      </button>
                    </form>
                    <div className="text-center fw-bold mt-2 pt-2 pb-4">
                      <p>
                        Don't have an Account ?
                        <Link to={"/register"}> Register</Link>
                      </p>
                      <p style={{ letterSpacing: "0.1em" }}>
                        {" "}
                        <span className="fw-bold">FOR TESTING</span> <br />{" "}
                        'user@123' as email
                        <br />
                        'user@123' as password
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    </div>
  );
}

export default Login;
