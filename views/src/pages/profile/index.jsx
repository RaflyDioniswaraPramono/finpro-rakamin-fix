import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alerts, Backdrops, DashboardNavs } from "../../components";
import Container from "../../components/Container";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../services/state.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = (props) => {
  Profile.propTypes = {
    logOut: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = await JSON.parse(localStorage.getItem("accessToken"));

      await axios
        .get(`http://localhost:8080/api/v1/admins/${id}`, {
          headers: {
            access_token: token,
          },
        })
        .then((response) => {
          setDatas([response.data.datas]);
        })
        .catch(async (err) => {
          const token = await JSON.parse(localStorage.getItem("accessToken"));
          if (token === null) {
            props.openBackdrop();
            props.openAlert({
              alertType: "error",
              alertTitle: "Error!",
              alertMessage: err.response.data.message,
            });

            setTimeout(() => {
              props.closeAlert();
              props.closeBackdrop();

              navigate("/login");
            }, 1000);
          }
        });
    };
    fetchAdminData();
  }, [id, navigate, props]);

  const handleLogOut = async () => {
    props.logOut();
    localStorage.removeItem("accessToken");

    const token = await JSON.parse(localStorage.getItem("accessToken"));
    if (token === null) {
      props.openBackdrop();
      props.openAlert({
        alertType: "success",
        alertTitle: "Success!",
        alertMessage: "Logout successfully!",
      });

      setTimeout(() => {
        props.closeAlert();
        props.closeBackdrop();

        navigate("/login");
      }, 1000);
    }
  };

  return (
    <React.Fragment>
      <Backdrops />
      <Alerts />
      <DashboardNavs />
      <Container>
        {datas.map((data) => {
          const {
            id,
            Role,
            admin_name,
            email,
            username,
            profil_photo,
            description,
          } = data;

          return (
            <div
              key={id}
              className="grid grid-cols-1 lg:grid-cols-7 lg:gap-10 mt-8 lg:mt-14">
              <div className="col-span-3 bg-slate-100 px-7 py-9 shadow-lg rounded-xl">
                <div className="flex items-center mb-6">
                  <img
                    src={`http://localhost:8080/${profil_photo}`}
                    alt="Fake Profile"
                    className="w-24 h-24 mr-5"
                  />
                  <div>
                    <h3 className="tracking-wider text-xl font-bold">
                      {admin_name}
                    </h3>
                    <h4 className="tracking-wide">{email}</h4>
                  </div>
                </div>
                <div className="w-full h-[0.1rem] bg-zinc-200 mb-12"></div>
                <h1 className="tracking-widest font-bold text-xl mb-3">
                  ACCOUNT DATA
                </h1>
                <div className="mb-2">
                  <div className="grid grid-cols-5 items-center">
                    <p className="col-span-2 justify-start font-semibold tracking-wider">
                      ROLE
                    </p>
                    <p className="col-span-1 flex justify-start">:</p>
                    <p className="tracking-widest">{Role.role_name}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="grid grid-cols-5 items-center">
                    <p className="col-span-2 justify-start font-semibold tracking-wider">
                      USERNAME
                    </p>
                    <p className="col-span-1 flex justify-start">:</p>
                    <p className="tracking-widest">{username}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="grid grid-cols-5 items-center">
                    <p className="col-span-2 justify-start font-semibold tracking-wider">
                      PASSWORD
                    </p>
                    <p className="col-span-1 flex justify-start">:</p>
                    <p className="tracking-widest italic">ENCRYPTED</p>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="grid grid-cols-5 items-center mb-1">
                    <p className="col-span-2 justify-start font-semibold tracking-wider">
                      DESCRIPTION
                    </p>
                    <p className="col-span-1 flex justify-start">:</p>
                    <div></div>
                  </div>
                  <p className="text-sm">{description}</p>
                </div>
                <div className="grid grid-cols-1">
                  <div className="col-span-2">
                    <button
                      onClick={() => handleLogOut()}
                      className="w-full py-[0.6rem] px-5 text-gray-100 bg-red-700 tracking-wider rounded-sm hover:bg-red-800">
                      LOG OUT
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-4 bg-slate-100 p-5 shadow-lg rounded-xl">
                <h1 className="tracking-widest font-bold text-2xl">
                  LOG VIEWS
                </h1>
              </div>
            </div>
          );
        })}
      </Container>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
