import "./styles.scss";

export default function CreateCard(props) {
  const { handleCreateCard } = props;
  return (
    <div className="create-card" onClick={handleCreateCard}>
      <a>+ Add another card</a>
    </div>
  );
}
