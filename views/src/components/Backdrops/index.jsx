import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../services/state.service";

// eslint-disable-next-line react-refresh/only-export-components
const Backdrops = (props) => {
  Backdrops.propTypes = {
    showBackdrop: PropTypes.bool,
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.showBackdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Backdrops);
