import { combineReducers } from "@reduxjs/toolkit";
import cardReducer from "./reducers/cardReducer";
import listReducer from "./reducers/listReducer";
import boardReducer from "./reducers/boardReducer";

const rootReducer = combineReducers({
  cardReducer,
  listReducer,
  boardReducer,
});

export default rootReducer;
