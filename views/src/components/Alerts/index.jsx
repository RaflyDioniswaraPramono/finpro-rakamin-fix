import PropTypes from "prop-types";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../services/state.service";

// eslint-disable-next-line react-refresh/only-export-components
const Alerts = (props) => {
  Alerts.propTypes = {
    showAlert: PropTypes.bool,
    setShowAlert: PropTypes.func,
    alertType: PropTypes.string,
    alertTitle: PropTypes.string,
    alertMessage: PropTypes.string,
  };

  return (
    <Collapse
      in={props.showAlert}
      sx={{ position: "fixed", top: 100, right: 50, zIndex: 10 }}>
      <Alert severity={props.alertType}>
        <AlertTitle>{props.alertTitle}</AlertTitle>
        {props.alertMessage}
      </Alert>
    </Collapse>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
