import { CREATE_BOARD, SET_ACTIVE_BOARD } from "../constants";
import shortid from "shortid";

export function createBoard(title) {
  const id = shortid.generate();
  return {
    type: CREATE_BOARD,
    payload: { title, id },
  };
}

export function setActiveBoard(id) {
  return {
    type: SET_ACTIVE_BOARD,
    payload: id,
  };
}
