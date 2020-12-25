import { Switch, Route } from "react-router-dom";
import Home from "../views/Home";
import Board from "../views/Board";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/board/:id" component={Board} />
    </Switch>
  );
}
