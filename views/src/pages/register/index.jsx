import PropTypes from "prop-types";
import React, { useState } from "react";
import { Backdrops, Navbar } from "../../components";
import Container from "../../components/Container";
import Alerts from "../../components/Alerts";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../services/state.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const Register = (props) => {
  Register.propTypes = {
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const navigate = useNavigate();

  const [values, setValues] = useState({
    adminName: "",
    email: "",
    username: "",
    password: "",
    description: "",
  });
  const [profilPhoto, setProfilPhoto] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };  

  const handleRegister = async (event) => {
    event.preventDefault();

    await axios
      .post(
        "http://localhost:3001/api/v1/register",
        
        {
          roleId: 2,
          adminName: values.adminName,
          profilPhoto: profilPhoto,
          email: values.email,
          username: values.username,
          password: values.password,
          description: values.description,
        }, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((response) => {
        props.openBackdrop();
          props.openAlert({
            alertType: "success",
            alertTitle: "Success!",
            alertMessage: response.data.message,
          });

          setTimeout(() => {
            props.closeAlert();
            props.closeBackdrop();

            navigate("/login");
          }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <Alerts />
      <Backdrops />
      <div className="relative">
        <Container>
          <div className="py-10 px-5 bg-slate-50 shadow-xl rounded-2xl mt-20 lg:mt-28">
            <h1 className="text-4xl font-bold tracking-widest text-center mb-5">
              REGISTER
            </h1>
            <form onSubmit={handleRegister} method="POST" encType="multipart/form-data">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="px-1 lg:px-5">
                  <div className="mb-4">
                    <p className="font-medium tracking-widest mb-2">NAME</p>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      name="adminName"
                      value={values.adminName}
                      onChange={handleChange}
                      className="p-3 text-sm w-full rounded-sm bg-slate-200 tracking-wider"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="font-medium tracking-widest mb-2">EMAIL</p>
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="p-3 text-sm w-full rounded-sm bg-slate-200 mb-1 tracking-wider"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="font-medium tracking-widest mb-2">USERNAME</p>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      className="p-3 text-sm w-full rounded-sm bg-slate-200 mb-1 tracking-wider"
                    />
                  </div>
                  <div>
                    <p className="font-medium tracking-widest mb-2">PASSWORD</p>
                    <input
                      type="password"
                      required
                      autoComplete="off"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="p-3 text-sm w-full rounded-sm bg-slate-200 mb-1 tracking-wider"
                    />
                  </div>
                </div>
                <div className="px-1 lg:px-5">
                  <div className="mb-4">
                    <p className="font-medium tracking-widest mb-2">
                      PROFIL PHOTO
                    </p>
                    <input
                      type="file"
                      name="profilPhoto"
                      required
                      onChange={(event) => {
                        setProfilPhoto(event.target.files[0])
                      }}
                      className="p-3 text-sm w-full rounded-sm bg-slate-200 mb-1 tracking-wider cursor-pointer"
                    />
                  </div>
                  <div className="mb-7">
                    <p className="font-medium tracking-widest mb-2">
                      DESCRIBE YOURSELF
                    </p>
                    <textarea
                      rows={6}
                      required
                      autoComplete="off"
                      className="w-full bg-slate-200 p-2 text-sm tracking-wider resize-none rounded-sm"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-12">
                    <button
                      type="submit"
                      className="bg-indigo-900 py-3 px-5 w-full rounded-sm text-slate-50 hover:bg-indigo-950 mr-2 tracking-wider">
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center mb-20 lg:mb-0">
                Already have account?{" "}
                <a
                  href="/login"
                  className="text-indigo-500 underline font-medium hover:text-indigo-800">
                  Login right here.
                </a>{" "}
              </p>
            </form>
          </div>
        </Container>
        <div className="absolute lg:fixed bottom-5 text-center w-full text-sm tracking-wider">
          <p>
            Copyrights&copy; & All Rights Reserved By FSWD 6B | Rakamin Academy.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Register);
