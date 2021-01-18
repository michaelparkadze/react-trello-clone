import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "../../components/List";
import CreateList from "../../components/CreateList";
import { getBoardKey, mergeDataWithKey } from "../../utils/index";
import { db } from "../../firebase";

import "./styles.scss";

export default function Board() {
  const history = useHistory();

  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [boardKey, setBoardKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const boardKey = getBoardKey();
    Promise.all([db.onceGetBoard(boardKey), db.onceGetLists(boardKey)])
      .then((snapshots) => {
        const lists = mergeDataWithKey(snapshots[1].val());
        setLists(lists.sort((a, b) => a.index - b.index));

        setBoardKey(boardKey);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleSetCards = (listCards) => {
    setCards((prevState) => [...prevState, listCards]);
  };

  const handleCreateList = (listTitle) => {
    db.doCreateList(boardKey, { title: listTitle }).then((res) => {
      const copiedLists = [...lists];
      copiedLists.push(res);
      setLists(copiedLists);
    });
  };

  const handleCreateCard = (params) => {
    const { listKey, cardTitle } = params;
    db.doAddCard(listKey, cardTitle)
      .then(() => db.onceGetCard(listKey))
      .then((snapshot) => {
        const snapshotVal = snapshot.val();
        if (snapshotVal) {
          // get back the cards
          // and update the list
          const newCards = mergeDataWithKey(snapshotVal);
          const cardsClone = [...cards];
          let cardsIndex = cardsClone.findIndex(
            (cards) => cards.listKey === listKey
          );

          if (cardsIndex !== -1) {
            cardsClone[cardsIndex] = {
              ...cardsClone[cardsIndex],
              cards: newCards,
            };
          } else {
            cardsClone[cardsClone.length] = {
              listKey: listKey,
              cards: newCards,
            };
          }

          console.log(cardsClone);
          setCards(cardsClone);
        }
      });
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    let droppableIdStart;
    let droppableIdEnd;
    let droppableIndexStart;
    let droppableIndexEnd;

    if (destination) {
      droppableIdEnd = destination.droppableId;
      droppableIndexEnd = destination.index;
    }

    if (source) {
      droppableIdStart = source.droppableId;
      droppableIndexStart = source.index;
    }

    if (!destination) {
      return;
    }

    if (type === "list") {
      const listsClone = [...lists];
      const pulledOutList = listsClone.splice(droppableIndexStart, 1);
      listsClone.splice(droppableIndexEnd, 0, ...pulledOutList);
      setLists(listsClone);
      db.onListMove({ boardKey, lists: listsClone });
    }

    // Card Key = draggable id
    // old list key = source droppableId
    // new list key = destination droppableId
    if (type === "card") {
      console.log(result);

      // change ui, and send the data to movecard to update database
      // change ui means doing forEach
      if (droppableIdStart === droppableIdEnd) {
        const cardsClone = [...cards];

        let cardsIndex = cardsClone.findIndex(
          (cards) => cards.listKey === droppableIdEnd
        );

        let listCards = cardsClone[cardsIndex].cards;
        const card = listCards.splice(droppableIndexStart, 1);
        listCards.splice(droppableIndexEnd, 0, ...card);

        setCards(cardsClone);

        db.doMoveCard({
          cards: cardsClone[cardsIndex].cards,
          newIndex: droppableIndexEnd,
          oldListKey: droppableIdStart,
          newListKey: droppableIdEnd,
          cardKey: draggableId,
        }).then((snapshot) => {
          console.log("moving cards will work");
          console.log(mergeDataWithKey(snapshot.val()));
        });
        console.log(listCards);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const cardsClone = [...cards];

        let startListIndex = cardsClone.findIndex(
          (cards) => cards.listKey === droppableIdStart
        );
        let endListIndex = cardsClone.findIndex(
          (cards) => cards.listKey === droppableIdEnd
        );

        let startList = cardsClone[startListIndex].cards;
        let endList = cardsClone[endListIndex].cards;

        const card = startList.splice(droppableIndexStart, 1);
        endList.splice(droppableIndexEnd, 0, ...card);
        console.log(cardsClone);

        setCards(cardsClone);
        db.doMoveCard({
          cards: cardsClone[endListIndex].cards,
          newIndex: droppableIndexEnd,
          oldListKey: droppableIdStart,
          newListKey: droppableIdEnd,
          cardKey: draggableId,
        }).then((snapshot) => {
          console.log("moving cards will work");
          console.log(mergeDataWithKey(snapshot.val()));
        });

        // put the card in the new list
        // listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
    }
  };
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <button onClick={() => console.log(cards)}>check state</button>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists?.map((list, index) => {
                  const listCards = cards.find(
                    (cards) => cards.listKey === list.key
                  );
                  // console.log(listCards);
                  return (
                    <List
                      key={list.key}
                      listKey={list.key}
                      listTitle={list.title}
                      cards={listCards}
                      setCards={handleSetCards}
                      handleCreateCard={handleCreateCard}
                      index={index}
                      title={list.title}
                    />
                  );
                })}
                {provided.placeholder}
                <CreateList handleCreateList={handleCreateList} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );

  const handleUpdateList = (listKey, title) => {
    db.doUpdateList(boardKey, listKey, { title }).then((res) => {
      const copiedLists = [...lists];
      const updatedList = copiedLists.find((list) => list.key === listKey);
      updatedList = { ...res, key: listKey };

      setLists(copiedLists);
    });
  };

  const handleDeleteList = (listKey) => {
    db.doDeleteList(boardKey, listKey).then(() => {
      const copiedLists = [...lists];
      const updatedLists = copiedLists.filter((list) => list.key !== listKey);
      setLists(updatedLists);
    });
  };

  // const handleDeleteBoard = (boardKey) => {
  //   db.doDeleteBoard(boardKey).then(() => {
  //     history.push("/boards");
  //   });
  // };

  // const handleUpdateBoard = (boardKey, title) => {
  //   db.doUpdateBoard(boardKey, title).then(() => {
  //     const updatedBoard = { ...this.state.board, ...title };
  //     setBoard(updatedBoard);
  //   });
  // };
}
