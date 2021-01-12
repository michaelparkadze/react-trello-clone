import {
  CREATE_BOARD,
  SET_ACTIVE_BOARD,
  DRAG_HAPPENED,
  ADD_LIST,
  DELETE_BOARD,
  DELETE_LIST,
} from "../constants";

const initialState = {
  boards: [
    {
      id: "board-0",
      lists: ["list-0"],
      title: "myboard",
    },
  ],
  activeBoard: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      const { boardId, id } = action.payload;

      // const board = state[boardId];
      const boardsClone = [...state.boards];
      const board = boardsClone.find((item) => item.id === boardId);
      const newListId = `list-${id}`;
      const newLists = [...board.lists, newListId];
      board.lists = newLists;
      return { ...state, boards: boardsClone };
    }

    case DRAG_HAPPENED: {
      const { boardId } = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      const lists = board.lists;
      const { droppableIndexEnd, droppableIndexStart, type } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardId]: board };
      }
      return state;
    }
    case DELETE_LIST: {
      const { listId, boardId } = action.payload;
      const board = state[boardId];
      const lists = board.lists;
      const newLists = lists.filter((id) => id !== listId);
      board.lists = newLists;
      return { ...state, [boardId]: board };
    }

    case CREATE_BOARD: {
      const { title, id } = action.payload;

      const boardsCopy = [...state.boards];
      const newBoard = {
        id: id,
        title: title,
        lists: [],
      };
      boardsCopy.push(newBoard);

      return { ...state, boards: boardsCopy };
    }

    case SET_ACTIVE_BOARD: {
      return {
        ...state,
        activeBoard: action.payload,
      };
    }
    default:
      return state;
  }
};
