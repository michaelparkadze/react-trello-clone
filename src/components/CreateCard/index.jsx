import { useState } from "react";
import "./styles.scss";

export default function CreateCard(props) {
  const [cardTitle, setCardTitle] = useState("");
  const { handleCreateCard, creatingCard, handleCreating } = props;
  return (
    <div className="create-card">
      {creatingCard ? (
        <div>
          <input
            type="text"
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateCard(cardTitle);
                handleCreating();
              }
            }}
            autoFocus
          />
          <button
            onClick={() => {
              handleCreating();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCreateCard(cardTitle);
              handleCreating();
            }}
          >
            Create
          </button>
        </div>
      ) : (
        <a onClick={handleCreating}>+ Add another card</a>
      )}
    </div>
  );
}
