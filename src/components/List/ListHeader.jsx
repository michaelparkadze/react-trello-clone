import { useState, useEffect } from "react";

export default function ListHeader(props) {
  const [headerTitle, setHeaderTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { title, listKey } = props;

  useEffect(() => {
    setHeaderTitle(title);
  }, []);

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={() => setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
        >
          <input
            type="text"
            value={headerTitle}
            // onChange={(e) => handleTitleChange(e)}
            autoFocus
          />
        </form>
      ) : (
        <div>{title}</div>
      )}
    </>
  );
}
