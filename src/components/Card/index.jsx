import { Draggable } from "react-beautiful-dnd";
import "./styles.scss";

export default function Card(props) {
  const { index, title, cardKey } = props;
  return (
    <Draggable draggableId={String(cardKey)} index={index}>
      {(provided) => (
        <>
          <div
            className="card-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // onDoubleClick={() => setIsEditing(true)}
            onClick={() => {
              console.log(cardKey);
            }}
          >
            <div className="card-container__content">{title}</div>
          </div>
        </>
      )}
    </Draggable>
  );
}
