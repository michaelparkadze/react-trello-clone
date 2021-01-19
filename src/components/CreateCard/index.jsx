import { useState } from "react";
import "./styles.scss";

export default function CreateCard(props) {
  const [cardTitle, setCardTitle] = useState("");
  const { listKey, handleCreateCard, creatingCard, handleCreatingCard } = props;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (cardTitle !== "") {
      handleCreateCard({ cardTitle, listKey });
      setCardTitle("");
    }

    //     handleCreatingCard();
  };
  return (
    <div className="create-card">
      {creatingCard ? (
        <form
          className="create-card-form"
          onSubmit={(event) => handleOnSubmit(event)}
          // onBlur={(event) => handleOnSubmit(event)}
        >
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          />
        </form>
      ) : (
        // <input
        //   type="text"
        //   onChange={(e) => setCardTitle(e.target.value)}
        //   onKeyPress={(e) => {
        //     if (e.key === "Enter") {
        //       handleCreateCard({ cardTitle, listKey });
        //       handleCreatingCard();
        //     }
        //   }}
        //   autoFocus
        // />
        // <button
        //   onClick={() => {
        //     handleCreatingCard();
        //   }}
        // >
        //   Cancel
        // </button>
        // <button
        //   onClick={() => {
        //     handleCreateCard({ cardTitle, listKey });
        //     handleCreatingCard();
        //   }}
        // >
        //   Create
        // </button>
        <a onClick={handleCreatingCard}>+ Add Card</a>
      )}
    </div>
  );
}
