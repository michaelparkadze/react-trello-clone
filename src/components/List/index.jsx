import { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { mergeDataWithKey } from "../../utils";
import { db } from "../../firebase";
import CreateCard from "../CreateCard";
import ListHeader from "./ListHeader";
import Card from "../Card";
import "./styles.scss";

export default function List(props) {
  const [creatingCard, setCreatingCard] = useState(false);

  const {
    cards,
    setCards,
    listTitle,
    listKey,
    handleCreateCard,
    handleUpdateList,
    handleDeleteList,
    index,
  } = props;

  useEffect(() => {
    db.onceGetCard(listKey).then((snapshot) => {
      const snapshotVal = snapshot.val();
      if (snapshotVal) {
        const data = {
          listKey,
          cards: mergeDataWithKey(snapshotVal).sort(
            (a, b) => a.index - b.index
          ),
        };
        setCards(data);
      }
    });
  }, []);

  const handleCreatingCard = () => {
    setCreatingCard(!creatingCard);
  };

  return (
    <Draggable key={listKey} draggableId={String(listKey)} index={index}>
      {(provided) => (
        <div
          className="list-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ListHeader
            title={listTitle}
            listKey={listKey}
            handleUpdateList={handleUpdateList}
            handleDeleteList={handleDeleteList}
          />
          <div className="list-container__content">
            <div className="list-container__content__cards">
              <Droppable droppableId={String(listKey)} type="card">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {cards &&
                      cards.cards?.map((card, index) => (
                        <Card
                          key={card.key}
                          index={index}
                          cardKey={card.key}
                          title={card.title}
                          listKey={listKey}
                        />
                      ))}
                    {provided.placeholder}
                    <CreateCard
                      listKey={listKey}
                      creatingCard={creatingCard}
                      handleCreatingCard={handleCreatingCard}
                      handleCreateCard={handleCreateCard}
                    />
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
