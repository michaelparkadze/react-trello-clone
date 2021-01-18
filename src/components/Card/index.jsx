import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import "./styles.scss";

export default function Card(props) {
  // const dispatch = useDispatch();

  const { index, key, title, cardKey } = props;
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
          >
            <div className="card-container__content">{title}</div>
          </div>
        </>
      )}
    </Draggable>
  );
}
