import PropTypes from "prop-types";
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
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
    supplierName: "",
    supplierAddress: ""
  });  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleAddSupplier = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:3001/api/v1/suppliers", {
        supplierName: values.supplierName,
        supplierAddress: values.supplierAddress
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
        props.openAlert({
          alertType: "error",
          alertTitle: "Error!",
          alertMessage: err.response.data.message,
        });
        props.setOpenAddForm(false);

        setTimeout(() => {
          props.closeAlert();
        }, 1000);
      });
  }

  return (
    <React.Fragment>      
      <Dialog
        open={props.openAddForm}
        onClose={() => props.setOpenAddForm(false)}>
        <div className="py-10 px-8 w-[30rem]">
          <div className="mb-10">
            <h3 className="text-center font-bold tracking-widest text-2xl">
              ADD SUPPLIER
            </h3>
          </div>
          <form onSubmit={handleAddSupplier}>
            <div className="mb-5">
              <p className="text-sm mb-2">Supplier Name</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="supplierName"
                onChange={handleChange}
                value={values.supplierName}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Supplier Address</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="supplierAddress"
                onChange={handleChange}
                value={values.supplierAddress}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>            
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <button
                  type="submit"
                  className="text-sm tracking-wide shadow-md p-[0.6rem] w-full bg-green-400 hover:bg-green-500 rounded-sm">
                  ADD SUPPLIER
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
