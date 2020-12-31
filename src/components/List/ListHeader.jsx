import { useState } from "react";

export default function ListHeader(props) {
  const [headerTitle, setHeaderTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { title } = props;
  const handleEnableEdit = () => {
    setHeaderTitle(title);
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setHeaderTitle(e.target.value);
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={() => setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
        >
          <input
            type="text"
            // value={title}
            onChange={(e) => handleTitleChange(e)}
            autoFocus
          />
        </form>
      ) : (
        <div onClick={() => handleEnableEdit()}>{title}</div>
      )}
    </>
  );
}
