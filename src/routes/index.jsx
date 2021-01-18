import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Boards from "../views/Boards";
import Board from "../views/Board";

export default function Routes() {
  return (
    <Switch>
      {/* <Redirect from="/" to="/boards" /> */}
      <PrivateRoute path="/boards" exact component={Boards} />
      <PrivateRoute path="/b/:id/:title" component={Board} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Redirect from="/" to="/boards" />
    </Switch>
  );
}
