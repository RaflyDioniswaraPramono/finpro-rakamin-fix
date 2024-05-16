import PropTypes from "prop-types";
import React, { useState } from "react";
import { Backdrops, Navbar } from "../../components";
import Container from "../../components/Container";
import axios from "axios";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../services/state.service";
import { Alerts } from "../../components";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const Login = (props) => {
  Login.propTypes = {
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,    
  };

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:3001/api/v1/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );

        validateLogin(response.data.id);
      })
      .catch((err) => {
        props.openAlert({
          alertType: "error",
          alertTitle: "Error!",
          alertMessage: err.response.data.message,
        });
        setTimeout(() => {
          props.closeAlert();
        }, 2000);
      });
  };

  const validateLogin = async (ids) => {
    const token = await JSON.parse(localStorage.getItem("accessToken"));

    await axios
      .get(`http://localhost:3001/api/v1/admins/${ids}`, {
        headers: {
          access_token: token,
        },
      })
      .then((response) => {
        const { role_id } = response.data.datas;

        if (role_id === 1) {          
          props.openBackdrop();
          props.openAlert({
            alertType: "success",
            alertTitle: "Success!",
            alertMessage: response.data.message,
          });

          setTimeout(() => {
            props.closeAlert();
            props.closeBackdrop();

            navigate(`/super/dashboard/${response.data.datas.id}`);
          }, 1500);
        } else {          
          props.openBackdrop();
          props.openAlert({
            alertType: "success",
            alertTitle: "Success!",
            alertMessage: response.data.message,
          });

          setTimeout(() => {
            props.closeAlert();
            props.closeBackdrop();

            navigate(`/dashboard/${response.data.datas.id}`);
          }, 1500);
        }
      })
      .catch((err) => {
        props.openAlert({
          alertType: "error",
          alertTitle: "Error!",
          alertMessage: err.response.data.message,
        });
        setTimeout(() => {
          props.closeAlert();
        }, 2000);
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <Backdrops />
      <Container>
        <Alerts />
        <div className="h-screen grid grid-cols-1 lg:grid-cols-5 items-center gap-20">
          <div className="col-span-2">
            <div className="py-10 px-5 bg-slate-50 shadow-xl rounded-2xl">
              <h1 className="text-4xl font-bold tracking-widest text-center mb-5 lg:mb-10">
                LOGIN
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-7">
                  <p className="font-medium tracking-widest mb-2">USERNAME</p>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className="p-3 text-sm w-full rounded-md bg-slate-200 tracking-wider"
                  />
                </div>
                <div className="mb-10">
                  <p className="font-medium tracking-widest mb-2">PASSWORD</p>
                  <input
                    type="password"
                    required
                    autoComplete="off"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="p-3 text-sm w-full rounded-md bg-slate-200 mb-1 tracking-wider"
                  />
                  <a
                    href="/forgot"
                    className="text-sm text-indigo-600 underline hover:font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="mb-8 lg:mb-12">
                  <button
                    type="submit"
                    className="bg-indigo-900 py-[0.6rem] px-5 w-[35%] rounded-md text-slate-50 hover:bg-indigo-950 mr-2 tracking-wider">
                    LOGIN
                  </button>
                </div>
                <div>
                  <p className="text-sm text-center">
                    Be an administrator by click register{" "}
                    <a
                      href="/register"
                      className="text-indigo-500 underline font-medium hover:text-indigo-800">
                      right here.
                    </a>{" "}
                    Wait until your registration form accepted.
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:block col-span-3">
            <h1 className="text-[3.5rem] font-bold leading-tight mb-5">
              Rakamin Academy Final Project
            </h1>
            <h4 className="text-2xl tracking-wider font-bold  mb-3">
              Inventory Tracking Master {"(ITM)"}
            </h4>
            <p className="text-sm tracking-wider text-slate-800 w-[90%]">
              <strong>Inventory Tracking Master</strong> is a website for{" "}
              <strong>Fast, Accurate and Flexible</strong> product management.
              You can use it for free by registering as an Admin. For those
              interested in creating a similar website, you can acquire the
              necessary skills by enrolling in Rakamin {"Academy's"} online
              course to become a <strong>Fullstack Website Developer</strong>.
              Don{"'t"} worry because with{" "}
              <strong className="italic">
                Rakamin Academy {`"Discover Potential, Increase Competence."`}
              </strong>
            </p>
          </div>
        </div>
      </Container>
      <div className="fixed bottom-5 text-center w-full text-sm tracking-wider">
        <p>
          Copyrights&copy; & All Rights Reserved By FSWD 6B | Rakamin Academy.
        </p>
      </div>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Login);
