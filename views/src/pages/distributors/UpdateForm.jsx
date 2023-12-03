import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../services/state.service";
import { Alerts, Backdrops } from "../../components";

// eslint-disable-next-line react-refresh/only-export-components
const UpdateForm = (props) => {
  UpdateForm.propTypes = {
    updatedDatas: PropTypes.object,
    openUpdateForm: PropTypes.bool,
    setOpenUpdateForm: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const [values, setValues] = useState({
    id: 1,
    distributorName: "",
    distributorAddress: "",
  });

  useEffect(() => {
    if (props.updatedDatas) {
      const { id, distributor_name, distributor_address } = props.updatedDatas;

      setValues({
        id: id,
        distributorName: distributor_name,
        distributorAddress: distributor_address,
      });
    }
  }, [props.updatedDatas]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .put("http://localhost:8080/api/v1/distributors", {
        id: values.id,
        distributorName: values.distributorName,
        distributorAddress: values.distributorAddress,
      })
      .then((response) => {
        props.openBackdrop();
        props.openAlert({
          alertType: "success",
          alertTitle: "Success!",
          alertMessage: response.data.message,
        });
        props.setOpenUpdateForm(false);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <Alerts />
      <Backdrops />
      <Dialog
        open={props.openUpdateForm}
        onClose={() => props.setOpenUpdateForm(false)}>
        <div className="py-10 px-8 w-[30rem]">
          <div className="mb-10">
            <h3 className="text-center font-bold tracking-widest text-2xl">
              UPDATE DISTRIBUTOR
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <p className="text-sm mb-2">Distributor Name</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="distributorName"
                onChange={handleChange}
                value={values.distributorName}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="mb-5">
              <p className="text-sm mb-2">Distributor Address</p>
              <input
                type="text"
                autoComplete="off"
                required
                name="distributorAddress"
                onChange={handleChange}
                value={values.distributorAddress}
                className="p-2 text-sm tracking-wider w-full bg-gray-100 shadow-md rounded-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <button
                  type="submit"
                  className="text-sm tracking-wide shadow-md p-[0.6rem] w-full bg-green-400 hover:bg-green-500 rounded-sm">
                  UPDATE DISTRIBUTOR
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => props.setOpenUpdateForm(false)}
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
