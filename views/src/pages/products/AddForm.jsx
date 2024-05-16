import { Dialog } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../services/state.service";

// eslint-disable-next-line react-refresh/only-export-components
const AddForm = (props) => {
  AddForm.propTypes = {
    openAddForm: PropTypes.bool,
    setOpenAddForm: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const [values, setValues] = useState({
    categoryId: 1,
    stockTypeId: 1,
    productName: "",
    productPrice: 0,
  });
  const [productTypes, setProductTypes] = useState([]);
  const [productCategories, setProcuctCategories] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      await axios
        .get("http://localhost:3001/api/v1/types")
        .then((response) => {
          setProductTypes([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("http://localhost:3001/api/v1/categories")
        .then((response) => {
          setProcuctCategories([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDatas();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:3001/api/v1/products", {
        categoryId: parseInt(values.categoryId),
        stockTypeId: parseInt(values.stockTypeId),
        productName: values.productName,
        productPrice: parseInt(values.productPrice),
        productStock: 0,
      })
      .then((response) => {
        props.openBackdrop();
        props.openAlert({
          alertType: "success",
          alertTitle: "Success!",
          alertMessage: response.data.message,
        });
        props.setOpenAddForm(false);

        setTimeout(() => {
          props.closeAlert();
          props.closeBackdrop();

          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>        
      <Dialog
        open={props.openAddForm}
        onClose={() => props.setOpenAddForm(false)}>
        <div className="py-10 px-8 w-[30rem]">
          <div className="mb-10">
            <h3 className="text-center font-bold tracking-widest text-2xl">
              ADD PRODUCT
            </h3>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="mb-5">
              <p className="text-sm mb-2">Product Name</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="productName"
                onChange={handleChange}
                value={values.productName}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Product Price</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="productPrice"
                onChange={handleChange}
                value={values.productPrice}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Product Types</p>
              <select
                name="stockTypeId"
                onChange={handleChange}
                className="w-full text-sm p-2 bg-gray-100 shadow-md cursor-pointer">
                {productTypes.map((type) => {
                  const { id, stock_type } = type;

                  return (
                    <option key={id} value={id}>
                      {stock_type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-8">
              <p className="text-sm mb-2">Product Category</p>
              <select
                onChange={handleChange}
                name="categoryId"
                className="w-full text-sm p-2 bg-gray-100 shadow-md cursor-pointer">
                {productCategories.map((category) => {
                  const { id, category_name } = category;

                  return (
                    <option key={id} value={id}>
                      {category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <button
                  type="submit"
                  className="text-sm tracking-wide shadow-md p-[0.6rem] w-full bg-green-400 hover:bg-green-500 rounded-sm">
                  ADD PRODUCT
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => props.setOpenAddForm(false)}
                  className="text-sm tracking-wide p-[0.6rem] shadow-md w-full bg-red-400 hover:bg-red-500 rounded-sm">
                  CANCEL
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
