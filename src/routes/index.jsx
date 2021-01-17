import { Switch, Route } from "react-router-dom";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Boards from "../views/Boards";
import Board from "../views/Board";

export default function Routes() {
  return (
    <Switch>
      <Route path="/boards" exact component={Boards} />
      <Route path="/b/:id/:title" component={Board} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
    </Switch>
  );
}
