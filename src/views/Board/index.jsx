import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, sort } from "../../redux/actions/listActions";
import { setActiveBoard } from "../../redux/actions/boardActions";
import { createCard } from "../../redux/actions/cardActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateList from "../../components/CreateList";
import List from "../../components/List";
import Nav from "../../components/Nav";
import "./styles.scss";

export default function Board(props) {
  const dispatch = useDispatch();
  const [board, setBoard] = useState();

  const { boards } = useSelector((state) => state.boardReducer);
  const { lists } = useSelector((state) => state.listReducer);
  const cards = useSelector((state) => state.cardReducer);

  const { id, title } = props.match.params;
  useEffect(() => {
    const board = boards.find((board) => board.id === id);
    setBoard(board);
    dispatch(setActiveBoard(id));
  }, []);

  const handleOnDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      sort({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId: draggableId,
        type: type,
      })
    );
  };

  const handleCreateList = () => {
    dispatch(addList("Some title"));
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="lists-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board?.lists.map((listId, index) => {
                const list = lists.find((item) => item.id === listId);
                if (list) {
                  const listCards = list.cards.map((cardId) => cards[cardId]);

                  return (
                    <List
                      listId={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <CreateList handleCreateList={handleCreateList} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>

    // <div className="board-container">
    //   <div className="board-container__header">{title}</div>
    //   <div className="board-container__canvas">
    // <DragDropContext onDragEnd={handleOnDragEnd}>
    //   <Droppable droppableId="all-lists" direction="horizontal" type="list">
    //     {(provided) => (
    //       <div
    //         className="lists-container"
    //         {...provided.droppableProps}
    //         ref={provided.innerRef}
    //       >
    //         {board?.lists.map((listId, index) => {
    //           const list = lists[listId];
    //           if (list) {
    //             const listCards = list.cards.map((cardId) => cards[cardId]);

    //             return (
    //               <List
    //                 listId={list.id}
    //                 key={list.id}
    //                 title={list.title}
    //                 cards={listCards}
    //                 index={index}
    //               />
    //             );
    //           }
    //         })}
    //         {provided.placeholder}
    //         <button onClick={handleCreateList}>Create List</button>
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
    //   </div>
    // </div>
  );
}
