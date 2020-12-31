import { CREATE_CARD, EDIT_CARD, DELETE_CARD } from "../constants";
import shortid from "shortid";

export const createCard = (params) => {
  const { title, listId } = params;
  const id = shortid.generate();
  return {
    type: CREATE_CARD,
    payload: { title, listId, id },
  };
};

export const editCard = (id, listId, newText) => {
  return {
    type: EDIT_CARD,
    payload: { id, listId, newText },
  };
};

export const deleteCard = (id, listId) => {
  return {
    type: DELETE_CARD,
    payload: { id, listId },
  };
};
