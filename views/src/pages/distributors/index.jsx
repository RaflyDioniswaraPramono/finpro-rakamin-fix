import React, { useEffect, useState } from "react";
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
import Dashboard from "../dashboard";
import { deleteIcon, updateIcon } from "../../assets";
import { Alerts, Backdrops, Container } from "../../components";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

const Distributors = () => {
  const [distributorDatas, setDistributorDatas] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [updatedDatas, setUpdatedDatas] = useState(null);
  const [deletedId, setDeletedId] = useState(0);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const fetchDatas = async () => {
      if (keywords.length > 0) {
        await axios
        .post("http://localhost:8080/api/v1/search/distributors", {
          keywords: keywords,
        })
        .then((response) => {
          if (keywords.length > 0) {
            setDistributorDatas([...response.data.datas]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      } else {
        await axios
          .get("http://localhost:8080/api/v1/distributors")
          .then((response) => {
            setDistributorDatas([...response.data.datas]);
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

  const showUpdateDialog = async (ids) => {
    await axios
      .get(`http://localhost:8080/api/v1/distributors/${ids}`)
      .then((response) => {
        setUpdatedDatas(response.data.datas);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenUpdateForm(true);
  };

  return (
    <React.Fragment>
      <Dashboard />
      <Alerts />
      <Backdrops />
      <Container>
        <div className="mb-5">
        <div className="grid grid-cols-2 items-center mb-5 bg-[#A0D468] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Distributor Details
            </p>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
                value={keywords}
                placeholder="search distributors ..."
                className="bg-zinc-100 shadow-lg p-3 text-xs tracking-wider w-[50%] rounded-sm"
              />
            </div>
          </div>
          <TableContainer component={Paper} sx={{height: "400px", overflowY: "auto"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Distributor Name</TableCell>
                  <TableCell align="right">Distributor Address</TableCell>
                  <TableCell align="right">Update</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {distributorDatas.map((distributor) => (
                  <TableRow
                    key={distributor.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {distributor.distributor_name}
                    </TableCell>
                    <TableCell align="right">
                      {distributor.distributor_address}
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => showUpdateDialog(distributor.id)}>
                        <img
                          src={updateIcon}
                          alt="Update Icon"
                          className="w-7 h-7"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => showDeleteDialog(distributor.id)}>
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
        </div>
        <div className="mb-10">
          <button
            onClick={() => setOpenAddForm(true)}
            className="p-3 text-sm bg-green-300 rounded-md hover:bg-green-400">
            Add Distributor
          </button>
        </div>
      </Container>
      <AddForm openAddForm={openAddForm} setOpenAddForm={setOpenAddForm} />
      <UpdateForm
        updatedDatas={updatedDatas}
        openUpdateForm={openUpdateForm}
        setOpenUpdateForm={setOpenUpdateForm}
      />
      <DeleteForm
        deletedId={deletedId}
        openDeleteForm={openDeleteForm}
        setOpenDeleteForm={setOpenDeleteForm}
      />
    </React.Fragment>
  );
};

export default Distributors;
