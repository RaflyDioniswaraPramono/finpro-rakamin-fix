export const mapStateToProps = (state) => {
  return {
    showAlert: state.alert.showAlert,
    alertType: state.alert.alertType,
    alertTitle: state.alert.alertTitle,
    alertMessage: state.alert.alertMessage,
    showBackdrop: state.backdrop.showBackdrop,
    isLoggedIn: state.user.isLoggedIn,
    setAccessToken: state.user.setAccessToken,
    getAccessToken: state.user.getAccessToken,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    openAlert: ({ alertType, alertTitle, alertMessage }) =>
      dispatch({
        type: "OPEN_ALERT",
        alertType: alertType,
        alertTitle: alertTitle,
        alertMessage: alertMessage,
      }),
    closeAlert: () => dispatch({ type: "CLOSE_ALERT" }),
    openBackdrop: () => dispatch({ type: "OPEN_BACKDROP" }),
    closeBackdrop: () => dispatch({ type: "CLOSE_BACKDROP" }),
    logIn: () => dispatch({ type: "LOG_IN" }),
    logOut: () => dispatch({ type: "LOG_OUT" }),
  };
};
