import {
  ADD_LIST,
  DELETE_LIST,
  DRAG_HAPPENED,
  CREATE_CARD,
} from "../constants";

const initialState = {
  "list-0": {
    id: "list-0",
    cards: ["card-0"],
    title: "myList",
    board: "board-0",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const { title, id } = action.payload;

      const newList = {
        title: title,
        id: `list-${id}`,
        cards: [],
      };

      const newState = { ...state, [`list-${id}`]: newList };

      return newState;
    }

    case CREATE_CARD: {
      const { listId, id } = action.payload;
      const list = state[listId];
      list.cards.push(`card-${id}`);
      return { ...state, [listId]: list };
    }

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type,
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        console.log(action.payload);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd,
        };
      }
      return state;

    case DELETE_LIST: {
      const { listId } = action.payload;
      const newState = state;
      delete newState[listId];
      return newState;
    }
    default:
      return state;
  }
};
