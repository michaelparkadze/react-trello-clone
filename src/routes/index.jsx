import { Switch, Route } from "react-router-dom";
import Boards from "../views/Boards";
import Board from "../views/Board";

export default function Routes() {
  return (
    <Switch>
      <Route path="/boards" exact component={Boards} />
      <Route path="/b/:id/:title" component={Board} />
    </Switch>
  );
}
