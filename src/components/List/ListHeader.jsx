import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editListTitle } from "../../redux/actions/listActions";

export default function ListHeader(props) {
  const dispatch = useDispatch();
  const [headerTitle, setHeaderTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { title, listId } = props;

  useEffect(() => {
    setHeaderTitle(title);
  }, []);

  const handleEnableEdit = () => {
    setHeaderTitle(title);
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setHeaderTitle(e.target.value);
    if (e.target.value) {
      dispatch(editListTitle({ newTitle: e.target.value, listId }));
    }
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
            value={headerTitle}
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
