import {
  CREATE_BOARD,
  SET_ACTIVE_BOARD,
  DRAG_HAPPENED,
  ADD_LIST,
  DELETE_BOARD,
  DELETE_LIST,
} from "../constants";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOARD: {
      return action.payload;
    }
    default:
      return state;
  }
};
