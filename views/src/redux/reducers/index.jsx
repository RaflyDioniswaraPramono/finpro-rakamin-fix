import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import backdropReducer from "./backdropReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  backdrop: backdropReducer,
  user: userReducer
})

export default rootReducer;