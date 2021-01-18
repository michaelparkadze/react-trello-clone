import { useState } from "react";
import "./styles.scss";

export default function CreateCard(props) {
  const [cardTitle, setCardTitle] = useState("");
  const { listKey, handleCreateCard, creatingCard, handleCreatingCard } = props;
  return (
    <div className="create-card">
      {creatingCard ? (
        <div>
          <input
            type="text"
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateCard({ cardTitle, listKey });
                handleCreatingCard();
              }
            }}
            autoFocus
          />
          <button
            onClick={() => {
              handleCreatingCard();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCreateCard({ cardTitle, listKey });
              handleCreatingCard();
            }}
          >
            Create
          </button>
        </div>
      ) : (
        <a onClick={handleCreatingCard}>+ Add another card</a>
      )}
    </div>
  );
}
