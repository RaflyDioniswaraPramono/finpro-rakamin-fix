const initialState = {
  isLoggedIn: false,  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {        
        ...state,
        isLoggedIn: (state.isLoggedIn = true),
      };    
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: (state.isLoggedIn = false),        
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
