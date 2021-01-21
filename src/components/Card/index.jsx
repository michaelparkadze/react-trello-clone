import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function Card(props) {
  const [showIcons, setShowIcons] = useState(false);
  const [editing, setEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const {
    index,
    title,
    cardKey,
    listKey,
    handleEditCard,
    handleDeleteCard,
  } = props;

  useEffect(() => {
    setCardTitle(title);
  }, []);

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleShowIcons = () => {
    setShowIcons(true);
  };

  const handleHideIcons = () => {
    setShowIcons(false);
  };

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
  };

  const handleSubmitForm = (event, callback, listKey, cardKey, title) => {
    event.preventDefault();

    callback(listKey, cardKey, { title: cardTitle }).then(() =>
      setEditing(false)
    );
  };

  const onDeleteCard = (callback, listKey, cardKey) => {
    callback({ listKey, cardKey });
  };

  return (
    <Draggable draggableId={String(cardKey)} index={index}>
      {(provided) => (
        <>
          <div
            className="card-container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={handleShowIcons}
            onMouseLeave={handleHideIcons}
            onBlur={handleDisableEditing}
          >
            <div className="card-container__content">
              {editing ? (
                <form
                  onSubmit={(event) =>
                    handleSubmitForm(
                      event,
                      handleEditCard,
                      listKey,
                      cardKey,
                      title
                    )
                  }
                >
                  <Input
                    value={cardTitle}
                    onChange={(event) => handleTitleChange(event)}
                    autoFocus
                  />
                </form>
              ) : (
                <>
                  {showIcons && (
                    <div
                      className="card-icons"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Button
                        onClick={handleEnableEditing}
                        icon={<EditOutlined />}
                        style={{ fontSize: 8, border: "none" }}
                      ></Button>
                      <Button
                        onClick={() =>
                          onDeleteCard(handleDeleteCard, listKey, cardKey)
                        }
                        icon={<DeleteOutlined />}
                        style={{ fontSize: 8, border: "none" }}
                      ></Button>
                    </div>
                  )}
                  <div>{title}</div>
                </>
              )}
            </div>
            {/* <div className="card-container__options">
              <div className="edit"></div>
              <div className="delete"></div>
            </div> */}
          </div>
        </>
      )}
    </Draggable>
  );
}
