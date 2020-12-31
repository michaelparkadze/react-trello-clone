import {
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST_TITLE,
  DRAG_HAPPENED,
} from "../constants";
import shortid from "shortid";

export const addList = (title) => {
  return (dispatch, getState) => {
    const { activeBoard } = getState().boardReducer;
    const id = shortid.generate();

    dispatch({
      type: ADD_LIST,
      payload: { title, boardId: activeBoard, id },
    });
  };
};

export const deleteList = (listId) => {
  return (dispatch, getState) => {
    const { activeBoard } = getState().boardReducer;
    return dispatch({
      type: DELETE_LIST,
      payload: {
        listId,
        boardId: activeBoard,
      },
    });
  };
};

export const editListTitle = (params) => {
  return (dispatch, getState) => {
    const { activeBoard } = getState().boardReducer;

    const { listId, newTitle } = params;
    return dispatch({
      type: EDIT_LIST_TITLE,
      payload: {
        listId,
        newTitle,
        boardId: activeBoard,
      },
    });
  };
};

export const sort = (params) => {
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
  } = params;

  console.log(params);

  return (dispatch, getState) => {
    const { activeBoard } = getState().boardReducer;

    dispatch({
      type: DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardId: activeBoard,
      },
    });
  };
};
