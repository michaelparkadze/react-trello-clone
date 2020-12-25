import { combineReducers } from "@reduxjs/toolkit";
import cardReducer from "./reducers/cardReducer";

const rootReducer = combineReducers({
  cardReducer,
});

export default rootReducer;
