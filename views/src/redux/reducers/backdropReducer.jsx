const initialState = {
  showBackdrop: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_BACKDROP":
      return {
        ...state,
        showBackdrop: (state.showBackdrop = true),
      };
    case "CLOSE_BACKDROP":
      return {
        ...state,
        showBackdrop: (state.showBackdrop = false),
      };
    default:
      return {
        ...state,
      };
  }
};

export default alertReducer;
