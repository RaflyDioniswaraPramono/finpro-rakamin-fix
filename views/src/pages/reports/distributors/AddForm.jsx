import { Dialog } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../../services/state.service";

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

  const [distributorDatas, setDistributorDatas] = useState([]);
  const [productDatas, setProductDatas] = useState([]);

  const [productId, setProductId] = useState(0);
  const [distributorId, setDistributorId] = useState(0);
  const [amountDistributorProduct, setAmountDistributorProduct] = useState(0);
  const [sendingDate, setSendingDate] = useState("");

  useEffect(() => {
    const fetchDatas = async () => {
      await axios
        .get("http://localhost:3001/api/v1/distributors")
        .then((response) => {
          setDistributorDatas([...response.data.datas]);
          
          setDistributorId(response.data.datas[0].id);
        })        
        .catch((err) => {
          console.log(err);
        });
        
        await axios
        .get("http://localhost:3001/api/v1/products")
        .then((response) => {
          setProductDatas([...response.data.datas]);
          
          setProductId(response.data.datas[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDatas();
  }, []);

  const handleAddProduct = async (event) => {
    event.preventDefault();    

    await axios
      .post("http://localhost:3001/api/v1/reports/distributors", {
        productId: parseInt(productId),
        distributorId: parseInt(distributorId),
        amountDistributorProduct: parseInt(amountDistributorProduct),
        sendingDate: sendingDate,
      })
      .then((response) => {
        console.log(response);

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
        props.openAlert({
          alertType: "error",
          alertTitle: "Error!",
          alertMessage: err.response.data.message,
        });
        props.setOpenAddForm(false);

        setTimeout(() => {
          props.closeAlert();
        }, 2000);
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
              ADD DISTRIBUTOR REPORT
            </h3>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="mb-5">
              <p className="text-sm mb-2">Product Shipped Name</p>
              <select
                required
                name="productId"
                onChange={(event) => {
                  setProductId(event.target.value);
                }}
                className="w-full text-sm p-2 bg-gray-100 shadow-md cursor-pointer">
                {productDatas.map((product) => {
                  const { id, product_name } = product;

                  return (
                    <option key={id} value={id}>
                      {product_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-8">
              <p className="text-sm mb-2">Bought By</p>
              <select
                name="distributorId"
                onChange={(event) => {
                  setDistributorId(event.target.value);
                }}
                required
                className="w-full text-sm p-2 bg-gray-100 shadow-md cursor-pointer">
                {distributorDatas.map((distributor) => {
                  return (
                    <option key={distributor.id} value={distributor.id}>
                      {distributor.distributor_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Bought Total</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="amountDistributorProduct"
                onChange={(event) => {
                  setAmountDistributorProduct(event.target.value);
                }}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Sending Date</p>
              <input
                type="date"
                autoComplete="off"
                required
                name="sendingDate"
                onChange={(event) => {
                  setSendingDate(event.target.value);
                }}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <button
                  type="submit"
                  className="text-sm tracking-wide shadow-md p-[0.6rem] w-full bg-green-400 hover:bg-green-500 rounded-sm">
                  ADD REPORT
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
