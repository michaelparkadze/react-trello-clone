import {
  ADD_LIST,
  DELETE_LIST,
  DRAG_HAPPENED,
  CREATE_CARD,
  EDIT_LIST_TITLE,
} from "../constants";

const initialState = {
  lists: [
    {
      id: "list-0",
      cards: ["card-0"],
      title: "myList",
      board: "board-0",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_LIST_TITLE: {
      const { listId, newTitle, boardId } = action.payload;

      const listsClone = [...state.lists];
      const list = listsClone.find(
        (item) => item.id === listId && item.board === boardId
      );
      list.title = newTitle;

      return {
        ...state,
        lists: listsClone,
      };
    }
    case ADD_LIST: {
      const { title, id, boardId } = action.payload;

      const newList = {
        title: title,
        id: `list-${id}`,
        cards: [],
        board: boardId,
      };

      const listsClone = [...state.lists];
      listsClone.push(newList);

      const newState = { ...state, lists: listsClone };

      return newState;
    }

    case CREATE_CARD: {
      const { listId, id } = action.payload;
      const listsClone = [...state.lists];
      const list = listsClone.find((item) => item.id === listId);
      list.cards.push(`card-${id}`);

      return { ...state, lists: listsClone };
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
        const listsClone = [...state.lists];
        const list = listsClone.find((item) => item.id === droppableIdStart);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        console.log(action.payload);

        return { ...state, lists: listsClone };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        const listsClone = [...state.lists];
        // find the list where the drag happened
        const listStart = listsClone.find(
          (item) => item.id === droppableIdStart
        );
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = listsClone.find((item) => item.id === droppableIdEnd);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          lists: listsClone,
        };
      }
      return state;

    case DELETE_LIST: {
      const { listId } = action.payload;
      const listsClone = [...state.lists];
      listsClone.filter((item) => item.id !== listId);

      return {
        ...state,
        lists: listsClone,
      };
    }
    default:
      return state;
  }
};
