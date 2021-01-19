import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__home">
        <Link to="/boards">
          <HomeOutlined style={{ color: "#222", fontSize: "1.25rem" }} />
        </Link>
      </div>
      <div className="nav__settings"></div>
    </nav>
  );
}
