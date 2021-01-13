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
  const [creatingCard, setCreatingCard] = useState(false);
  const dispatch = useDispatch();
  const { listId, index, title, cards } = props;

  const handleCreating = () => {
    setCreatingCard(!creatingCard);
  };
  const handleCreateCard = (title) => {
    dispatch(createCard({ listId, title: title }));
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
              <ListHeader title={title} listId={listId} />
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
                    <CreateCard
                      handleCreating={handleCreating}
                      handleCreateCard={handleCreateCard}
                      creatingCard={creatingCard}
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
