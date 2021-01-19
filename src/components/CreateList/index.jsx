import "./styles.scss";

export default function CreateList(props) {
  const { handleCreateList } = props;
  return (
    <div className="create-list">
      <form onClick={() => handleCreateList("another list")}>
        + Add another list
      </form>
    </div>
  );
}
