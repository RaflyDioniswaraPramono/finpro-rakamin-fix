const initialState = {
  showAlert: false,
  alertType: "error",
  alertTitle: "Error!",
  alertMessage: "",
};

const alertReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case "OPEN_ALERT":
      return {
        ...state,
        showAlert: (state.showAlert = true),
        alertType: (state.alertType = payload.alertType),
        alertTitle: (state.alertTitle = payload.alertTitle),
        alertMessage: (state.alertMessage = payload.alertMessage),
      };
    case "CLOSE_ALERT":
      return {
        ...state,
        showAlert: (state.showAlert = false),        
      };
    default:
      return {
        ...state,
      };
  }
};

export default alertReducer;
