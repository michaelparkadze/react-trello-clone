import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { createCard } from "../../redux/actions/cardActions";
import { deleteList } from "../../redux/actions/listActions";
import CreateCard from "../CreateCard";
import ListHeader from "./ListHeader";
import Card from "../Card";
import "./styles.scss";

export default function List(props) {
  const [listCards, setListCards] = useState(null);
  const dispatch = useDispatch();
  const { listId, index, title, cards } = props;

  // useEffect(() => {
  //   setListCards(cards);
  // }, [cards]);

  const handleCreateCard = () => {
    dispatch(createCard({ listId, title: "new card alert" }));
  };

  const handleDeleteList = () => {
    dispatch(deleteList(listId));
  };

  return (
    <Draggable key={listId} draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          className="list-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-container__content">
            <div className="list-container__content__header">
              <ListHeader title={title} />
            </div>
            <div className="list-container__content__cards">
              <Droppable droppableId={String(listId)} type="card">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {cards?.map((card, index) => {
                      return (
                        <Card
                          key={card.id}
                          index={index}
                          id={card.id}
                          title={card.title}
                          listId={listId}
                        />
                      );
                    })}
                    {provided.placeholder}
                    <CreateCard handleCreateCard={handleCreateCard} />
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
