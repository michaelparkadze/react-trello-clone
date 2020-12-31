import "./styles.scss";

export default function CreateList(props) {
  const { handleCreateList } = props;
  return (
    <div className="create-list" onClick={handleCreateList}>
      <form>+ Add another list</form>
    </div>
  );
}
