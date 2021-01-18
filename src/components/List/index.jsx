import { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CreateCard from "../CreateCard";
import ListHeader from "./ListHeader";
import Card from "../Card";
import "./styles.scss";
import { db } from "../../firebase";
import { mergeDataWithKey } from "../../utils";

export default function List(props) {
  const [cardTitle, setCardTitle] = useState("");
  const [creatingCard, setCreatingCard] = useState(false);

  const {
    cards,
    setCards,
    listTitle,
    listKey,
    handleCreateCard,
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
        console.log(data);
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
          <div className="list-container__content">
            <div className="list-container__content__header">
              <ListHeader title={listTitle} listKey={listKey} />
            </div>
            <div className="list-container__content__cards">
              <Droppable droppableId={String(listKey)} type="card">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {/* <input
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                    />
                    <button onClick={() => console.log(cards)}>
                      check cards
                    </button>
                    <button
                      onClick={() => {
                        cardTitle !== "" &&
                          handleCreateCard({ cardTitle, listKey });
                      }}
                    >
                      create card
                    </button> */}

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
