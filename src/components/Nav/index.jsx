import { Link } from "react-router-dom";
import "./styles.scss";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__home">
        <Link to="/boards">Home</Link>
      </div>
      <div className="nav__settings"></div>
    </nav>
  );
}
