import { Button } from "antd";
import "./styles.scss";

export default function CreateBoardCard(props) {
  return (
    <Button className="create-board-card" onClick={props.onClick}>
      Create a new board...
    </Button>
  );
}
