import { Dialog } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../../services/state.service";

// eslint-disable-next-line react-refresh/only-export-components
const DeleteForm = (props) => {
  DeleteForm.propTypes = {
    deletedId: PropTypes.number,
    openDeleteForm: PropTypes.bool,
    setOpenDeleteForm: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:8080/api/v1/reports/suppliers/${props.deletedId}`)
      .then((response) => {
        props.openBackdrop();
        props.openAlert({
          alertType: "success",
          alertTitle: "Success!",
          alertMessage: response.data.message,
        });
        props.setOpenDeleteForm(false);

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
    <Dialog
      open={props.openDeleteForm}
      onClose={() => props.setOpenDeleteForm(false)}>
      <div className="py-10 px-8 w-[30rem]">
        <div className="mb-10">
          <h3 className="text-center font-bold tracking-widest text-2xl">
            DELETE SUPPLIER REPORT
          </h3>
          <p className="text-center">
            Are you sure want to delete this supplier report?
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <button
              onClick={() => handleDelete()}
              className="text-sm tracking-wide shadow-md p-[0.6rem] w-full bg-red-400 hover:bg-red-500 rounded-sm">
              DELETE REPORT
            </button>
          </div>
          <div className="col-span-1">
            <button
              type="button"
              onClick={() => props.setOpenDeleteForm(false)}
              className="text-sm tracking-wide p-[0.6rem] shadow-md w-full bg-green-400 hover:bg-green-500 rounded-sm">
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(DeleteForm);