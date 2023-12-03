import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
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
import { deleteIcon, updateIcon } from "../../../assets";
import { Alerts, Backdrops, Container } from "../../../components";

const StockTypes = () => {
  const [stockTypeDatas, setStockTypeDatas] = useState([]);
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
          .post("http://localhost:8080/api/v1/search/types", {
            keywords: keywords,
          })
          .then((response) => {
            if (keywords.length > 0) {
              setStockTypeDatas([...response.data.datas]);
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        await axios
          .get("http://localhost:8080/api/v1/types")
          .then((response) => {
            setStockTypeDatas([...response.data.datas]);
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
      .get(`http://localhost:8080/api/v1/types/${ids}`)
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
      <Alerts />
      <Backdrops />
      <Container>
        <div className="mb-5">
          <div className="grid grid-cols-2 items-center mb-5 bg-[#005EDF] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Stock Type Details
            </p>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
                value={keywords}
                placeholder="search stock types ..."
                className="bg-zinc-100 shadow-lg p-3 text-xs tracking-wider w-[50%] rounded-sm"
              />
            </div>
          </div>
          <TableContainer component={Paper} sx={{height: "400px", overflowY: "auto"}}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Stock Type Name</TableCell>                  
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockTypeDatas.map((stockType) => (
                  <TableRow
                    key={stockType.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {stockType.stock_type}
                    </TableCell>                    
                    <TableCell align="center">
                      <button onClick={() => showUpdateDialog(stockType.id)}>
                        <img
                          src={updateIcon}
                          alt="Update Icon"
                          className="w-7 h-7"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button onClick={() => showDeleteDialog(stockType.id)}>
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
            Add Stock Type
          </button>
        </div>
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
      </Container>
    </React.Fragment>
  );
};

export default StockTypes;
