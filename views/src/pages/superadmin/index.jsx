import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alerts, Backdrops, Container, DashboardNavs } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../services/state.service";
import { acceptIcon, adminsIcon, declineIcon } from "../../assets";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AdminDetails from "./AdminDetails";
import Accept from "./Accept";
import Decline from "./Decline";

// eslint-disable-next-line react-refresh/only-export-components
const SuperAdmins = (props) => {
  SuperAdmins.propTypes = {
    logOut: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const [datas, setDatas] = useState([]);
  const [adminDatas, setAdminDatas] = useState([]);
  const [unAcceptedDatas, setUnAcceptedDatas] = useState([]);
  const [shortType, setShortType] = useState("ASC");

  const [openAcceptForm, setOpenAcceptForm] = useState(false);
  const [acceptedId, setAcceptedId] = useState(0);
  const [openDeclineForm, setOpenDeclineForm] = useState(false);
  const [declinedId, setDeclinedId] = useState(0);

  useEffect(() => {
    const fetchDatas = async () => {
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

      await axios
        .get("http://localhost:8080/api/v1/approves", {
          headers: {
            access_token: token,
          },
        })
        .then((response) => {
          console.log(response);
          setUnAcceptedDatas([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDatas();
  }, [id, navigate, props]);

  const acceptHandle = (ids) => {
    setAcceptedId(ids);
    setOpenAcceptForm(true);
  };

  const declineHandle = (ids) => {
    setDeclinedId(ids);
    setOpenDeclineForm(true);
  };

  return (
    <React.Fragment>
      <DashboardNavs />
      <Alerts />
      <Backdrops />
      <div className="absolute bg-indigo-100 w-full h-72 -z-[1] top-[7rem]"></div>
      <Container>
        {datas.map((data) => {
          const { id, Role, admin_name } = data;

          return (
            <div key={id} className="mt-[6rem]">
              <div className="mb-24">
                <div>
                  <p className="text-xl font-medium tracking-wider leading-1 mb-2">
                    Welcome{" "}
                    <span className="font-semibold">{Role.role_name}</span>,
                  </p>
                  <p className="text-3xl font-bold tracking-wider leading-1 mb-1">
                    {admin_name}
                  </p>
                  <p className="tracking-wide">
                    Super admin account, now is{" "}
                    <span className="font-bold text-green-600">ONLINE!</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">
          <div className="col-span-2">
            <div className="grid grid-cols-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
              <div className="col-span-1 flex justify-center">
                <img src={adminsIcon} alt="Admins Icon" className="w-14 h-14" />
              </div>
              <div className="col-span-2 flex items-center flex-col">
                <h2 className="text-3xl font-bold mr-2 text-[#005EDF]">
                  {adminDatas.length}
                </h2>
                <h3 className="font-medium tracking-wider">
                  Total Active Admins
                </h3>
              </div>
            </div>
            <button
              onClick={() => (location.href = `/super/dashboard/${id}`)}
              className="text-sm p-2 w-full text-center mt-2 bg-[#005EDF] hover:bg-[#2a2aa9] text-slate-50 rounded-sm">
              Admin Details
            </button>
          </div>

          <div className="col-span-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
            <h4 className="text-xl font-bold tracking-wider mb-1">
              Description
            </h4>
            <p className="tracking-wide">
              In this page the super admin can accept and reject the
              registration of new ordinary admins. Admins who register will
              become admins if the registration is accepted.
            </p>
          </div>
        </div>
        <div className="mb-20">
          <div className="grid grid-cols-2 items-center mb-5 bg-[#005EDF] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Register Request
            </p>
            <div className="flex justify-end">
              <select
                value={shortType}
                onChange={(event) => setShortType(event.target.value)}
                className="w-1/2 p-2 text-sm cursor-pointer rounded-sm">
                <option disabled>SORT BY DATE</option>
                <option value="ASC">OLD</option>
                <option value="DESC">NEW</option>
              </select>
            </div>
          </div>
          <TableContainer
            component={Paper}
            sx={{ height: "400px", overflowY: "auto" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Admin Name</TableCell>
                  <TableCell align="center">Profil Photo</TableCell>
                  <TableCell align="right">Role Name</TableCell>
                  <TableCell align="right">E-Main Address</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Admin Description</TableCell>
                  <TableCell align="center">Accept</TableCell>
                  <TableCell align="center">Reject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unAcceptedDatas.map((admin) => {
                  return (
                    <TableRow
                      key={admin.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {admin.admin_name}
                      </TableCell>
                      <TableCell align="right">
                        <img                          
                          src={`http://localhost:8080/${admin.profil_photo}`}
                          alt={admin.profil_photo}
                          className="w-20 h-20 rounded-full p-0"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {admin.Role.role_name}
                      </TableCell>
                      <TableCell align="right">{admin.email}</TableCell>
                      <TableCell align="right">{admin.username}</TableCell>
                      <TableCell align="right">{admin.description}</TableCell>
                      <TableCell align="center">
                        <button onClick={() => acceptHandle(admin.id)}>
                          <img
                            src={acceptIcon}
                            alt="Delete Icon"
                            className="w-7 h-7"
                          />
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button onClick={() => declineHandle(admin.id)}>
                          <img
                            src={declineIcon}
                            alt="Delete Icon"
                            className="w-7 h-7"
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
      <AdminDetails adminDatas={adminDatas} setAdminDatas={setAdminDatas} />
      <Accept
        acceptedId={acceptedId}
        openAcceptForm={openAcceptForm}
        setOpenAcceptForm={setOpenAcceptForm}
      />
      <Decline
        declinedId={declinedId}
        openDeclineForm={openDeclineForm}
        setOpenDeclineForm={setOpenDeclineForm}
      />
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmins);
