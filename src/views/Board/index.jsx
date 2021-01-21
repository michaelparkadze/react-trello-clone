import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getBoardKey, mergeDataWithKey } from "../../utils/index";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import List from "../../components/List";
import CreateList from "../../components/CreateList";
import Loader from "../../components/Loader";
import BoardTitle from "../../components/BoardTitle";
import "./styles.scss";

export default function Board() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState([]);
  const [boardKey, setBoardKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const boardKey = getBoardKey();
    Promise.all([db.onceGetBoard(boardKey), db.onceGetLists(boardKey)])
      .then((snapshots) => {
        const board = snapshots[0].val();
        const lists = mergeDataWithKey(snapshots[1].val());
        setLists(lists.sort((a, b) => a.index - b.index));
        setBoard(board);
        setBoardKey(boardKey);
        setLoading(false);
        setDataFetched(true);
      })
      .catch((error) => {
        setLoading(false);
        setDataFetched(false);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (dataFetched) {
      console.log("log one time");
      console.log(cards);
    }
  }, [dataFetched]);

  const handleSetCards = (listCards) => {
    setCards((prevState) => [...prevState, listCards]);
  };

  const handleCreateList = (listTitle) => {
    db.doCreateList(boardKey, { title: listTitle }).then((res) => {
      const copiedLists = [...lists];
      const copiedCards = [...cards];
      copiedCards.push({
        listKey: res.key,
        cards: [],
      });
      copiedLists.push(res);
      console.log(res);
      setLists(copiedLists);
      setCards(copiedCards);
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

  const handleEditCard = (params) => {
    const { listKey, cardKey, card } = params;

    return db.doEditCard(listKey, cardKey, card).then(() => {
      const updatedCards = [...cards];
      // cards have listKey and all cards
      // find the cards of list key and find card out of cards.cards
      const listIndex = cards.findIndex((card) => card.listKey === listKey);
      const cardIndex = cards[listIndex].cards.findIndex(
        (card) => card.key === cardKey
      );

      updatedCards[listIndex].cards[cardIndex] = {
        ...updatedCards[listIndex].cards[cardIndex],
        ...card,
      };
      setCards(updatedCards);
    });
  };

  const handleDeleteCard = (params) => {
    const { listKey, cardKey } = params;

    return db.doDeleteCard(listKey, cardKey).then(() => {
      const cardsClone = [...cards];

      const listIndex = cardsClone.findIndex(
        (card) => card.listKey === listKey
      );

      const updatedCards = cardsClone[listIndex].cards.filter(
        (card) => card.key !== cardKey
      );

      cardsClone[listIndex].cards = updatedCards;

      setCards(cardsClone);
    });
  };

  const handleUpdateList = (listKey, title) => {
    return db.doUpdateList(boardKey, listKey, { title }).then((res) => {
      const copiedLists = [...lists];
      const listIndex = copiedLists.findIndex((list) => list.key === listKey);
      copiedLists[listIndex] = { ...copiedLists[listIndex], title };

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

  const handleDeleteBoard = (boardKey) => {
    return db.doDeleteBoard(boardKey).then(() => {
      history.push("/boards");
    });
  };

  const handleUpdateBoard = (boardKey, title) => {
    return db.doUpdateBoard(boardKey, title).then(() => {
      const updatedBoard = { ...board, ...title };
      setBoard(updatedBoard);
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

        if (cards.length !== lists.length) {
          const missingCards = lists.filter(
            (list) => !cardsClone.some((card) => list.key === card.listKey)
          );

          missingCards.forEach((list) => {
            cardsClone.push({
              listKey: list.key,
              cards: [],
            });
          });

          setCards(cardsClone);
        }

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
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BoardTitle
            title={board.title}
            boardKey={boardKey}
            updateBoard={handleUpdateBoard}
            deleteBoard={handleDeleteBoard}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="board-wrapper">
              <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="list"
              >
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

                      return (
                        <>
                          <List
                            key={list.key}
                            listKey={list.key}
                            listTitle={list.title}
                            cards={listCards}
                            setCards={handleSetCards}
                            handleCreateCard={handleCreateCard}
                            handleEditCard={handleEditCard}
                            handleDeleteCard={handleDeleteCard}
                            setDataFetched={setDataFetched}
                            index={index}
                            title={list.title}
                            handleUpdateList={handleUpdateList}
                            handleDeleteList={handleDeleteList}
                          />
                        </>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <CreateList handleCreateList={handleCreateList} />
            </div>
          </DragDropContext>
        </>
      )}
    </>
  );
}
