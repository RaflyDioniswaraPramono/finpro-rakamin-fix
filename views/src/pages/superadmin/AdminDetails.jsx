import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import DeleteForm from "./DeleteForm";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { deleteIcon } from "../../assets";

const AdminDetails = (props) => {
  AdminDetails.propTypes = {
    adminDatas: PropTypes.array,
    setAdminDatas: PropTypes.func,
  };

  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const fetchDatas = async () => {
      const token = await JSON.parse(localStorage.getItem("accessToken"));

      if (keywords.length > 0) {
        await axios
          .post("http://localhost:8080/api/v1/search/admins", {
            keywords: keywords,
          })
          .then((response) => {
            if (keywords.length > 0) {
              props.setAdminDatas([...response.data.datas]);
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        await axios
          .get("http://localhost:8080/api/v1/admins", {
            headers: {
              access_token: token,
            },
          })
          .then((response) => {
            props.setAdminDatas([...response.data.datas]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchDatas();
  }, [keywords]);

  const showDeleteDialog = (ids) => {
    setDeletedId(ids);
    setOpenDeleteForm(true);
  };

  return (
    <React.Fragment>
      <Container>
        <div>
          <div className="grid grid-cols-2 items-center mb-5 bg-[#005EDF] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Admin Details
            </p>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
                value={keywords}
                placeholder="search admins ..."
                className="bg-zinc-100 shadow-lg p-3 text-xs tracking-wider w-[50%] rounded-sm"
              />
            </div>
          </div>
        </div>
        <TableContainer
          component={Paper}
          sx={{ height: "400px", overflowY: "auto", mb: 20 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Admin Name</TableCell>
                <TableCell align="right">Profil Photo</TableCell>
                <TableCell align="right">Role Name</TableCell>
                <TableCell align="right">E-Main Address</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Admin Description</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.adminDatas?.map((admin) => (
                <TableRow
                  key={admin.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                  <TableCell align="right">{admin.Role.role_name}</TableCell>
                  <TableCell align="right">{admin.email}</TableCell>
                  <TableCell align="right">{admin.username}</TableCell>
                  <TableCell align="right">{admin.description}</TableCell>
                  <TableCell align="center">
                    <button onClick={() => showDeleteDialog(admin.id)}>
                      <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        className="w-7 h-7"
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DeleteForm
          deletedId={deletedId}
          openDeleteForm={openDeleteForm}
          setOpenDeleteForm={setOpenDeleteForm}
        />
      </Container>
    </React.Fragment>
  );
};

export default AdminDetails;
