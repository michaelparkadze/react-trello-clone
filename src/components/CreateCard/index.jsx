import { useState } from "react";
import { Button } from "antd";
import "./styles.scss";

export default function CreateCard(props) {
  const [cardTitle, setCardTitle] = useState("");
  const { listKey, handleCreateCard, creatingCard, handleCreatingCard } = props;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (cardTitle !== "") {
      handleCreateCard({ cardTitle, listKey });
      setCardTitle("");
      handleCreatingCard(false);
    }
  };

  return (
    <div className="create-card">
      {creatingCard ? (
        <div className="create-card-form-container">
          <textarea
            value={cardTitle}
            placeholder="Enter the title for this card..."
            onSubmit={(event) => handleOnSubmit(event)}
            // onBlur={() => {
            //   setCardTitle("");
            //   handleCreatingCard(false);
            // }}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          ></textarea>
          <Button
            type="primary"
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              border: "rgb(60, 64, 82)",
              backgroundImage: "linear-gradient(45deg, #606c88, #3f4c6b)",
              marginRight: "8px",
            }}
            onClick={(event) => handleOnSubmit(event)}
          >
            Create
          </Button>
          <Button
            type="primary"
            shape="circle"
            style={{
              fontWeight: 500,
              color: "#3f4c6b",
              backgroundColor: "#fff",
              boxShadow: "none",
              border: "1px solid #3f4c6b",
            }}
            onClick={() => {
              setCardTitle("");
              handleCreatingCard(false);
            }}
          >
            X
          </Button>
        </div>
      ) : (
        <a onClick={handleCreatingCard}>+ Add Card</a>
      )}
    </div>
  );
}
