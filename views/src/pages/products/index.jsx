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
import Dashboard from "../dashboard";
import { deleteIcon, updateIcon } from "../../assets";
import { Alerts, Backdrops, Container } from "../../components";
import Categories from "../others/categories";
import StockTypes from "../others/stocktypes";

// eslint-disable-next-line react-refresh/only-export-components
const Products = () => {
  const [productDatas, setProductDatas] = useState([]);
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
          .post("http://localhost:8080/api/v1/search/products", {
            keywords: keywords,
          })
          .then((response) => {
            if (keywords.length > 0) {
              setProductDatas([...response.data.datas]);
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        await axios
          .get("http://localhost:8080/api/v1/products")
          .then((response) => {
            setProductDatas([...response.data.datas]);
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
      .get(`http://localhost:8080/api/v1/products/${ids}`)
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
          <div className="grid grid-cols-2 items-center mb-5 bg-[#005EDF] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Product Details
            </p>
            <div className="flex justify-end">
              <input
                type="text"
                onChange={(event) => {
                  setKeywords(event.target.value);
                }}
                value={keywords}
                placeholder="search product ..."
                className="bg-zinc-100 shadow-lg p-3 text-xs tracking-wider w-[50%] rounded-sm"
              />
            </div>
          </div>
          <TableContainer component={Paper} sx={{height: "400px", overflowY: "auto"}}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Product Price</TableCell>
                  <TableCell align="right">On Stock</TableCell>
                  <TableCell align="right">Product Type</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productDatas.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {product.product_name}
                    </TableCell>
                    <TableCell align="right">{product.product_price}</TableCell>
                    <TableCell align="right">{product.product_stock}</TableCell>
                    <TableCell align="right">
                      {product.StockType.stock_type}
                    </TableCell>
                    <TableCell align="right">
                      {product.Category.category_name}
                    </TableCell>
                    <TableCell align="center">
                      <button onClick={() => showUpdateDialog(product.id)}>
                        <img
                          src={updateIcon}
                          alt="Update Icon"
                          className="w-7 h-7"
                        />
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button onClick={() => showDeleteDialog(product.id)}>
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
            Add Product
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
      <Categories />
      <StockTypes />
    </React.Fragment>
  );
};

export default Products;
