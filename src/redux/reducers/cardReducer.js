import { CREATE_CARD, DELETE_CARD, EDIT_CARD } from "../constants";

const initialState = {
  "card-0": {
    title: "Last Episode",
    id: `card-0`,
    list: "list-0",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARD: {
      const { title, listId, id } = action.payload;

      const newCard = {
        title,
        id: `card-${id}`,
        list: listId,
      };

      return { ...state, [`card-${id}`]: newCard };
    }
    case EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = state[id];
      card.text = newText;
      return { ...state, [`card-${id}`]: card };
    }

    case DELETE_CARD: {
      const { id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;
    }
    default:
      return state;
  }
};
