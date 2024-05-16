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

const Suppliers = () => {
  const [supplierDatas, setSupplierDatas] = useState([]);
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
        .post("http://localhost:3001/api/v1/search/suppliers", {
          keywords: keywords,
        })
        .then((response) => {
          if (keywords.length > 0) {
            setSupplierDatas([...response.data.datas]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      } else {
        await axios
          .get("http://localhost:3001/api/v1/suppliers")
          .then((response) => {
            setSupplierDatas([...response.data.datas]);
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
      .get(`http://localhost:3001/api/v1/suppliers/${ids}`)
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
          <div className="grid grid-cols-2 items-center mb-5 bg-[#DD636E] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Supplier Details
            </p>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
                value={keywords}
                placeholder="search suppliers ..."
                className="bg-zinc-100 shadow-lg p-3 text-xs tracking-wider w-[50%] rounded-sm"
              />
            </div>
          </div>
          <TableContainer component={Paper} sx={{height: "400px", overflowY: "auto"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell align="right">Supplier Address</TableCell>
                  <TableCell align="right">Update</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplierDatas.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {supplier.supplier_name}
                    </TableCell>
                    <TableCell align="right">
                      {supplier.supplier_address}
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => showUpdateDialog(supplier.id)}>
                        <img
                          src={updateIcon}
                          alt="Update Icon"
                          className="w-7 h-7"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => showDeleteDialog(supplier.id)}>
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
            Add Supplier
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

export default Suppliers;
