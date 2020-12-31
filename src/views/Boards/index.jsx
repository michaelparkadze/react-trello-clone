import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../redux/actions/boardActions";
import Nav from "../../components/Nav";

export default function Home() {
  const dispatch = useDispatch();
  const { boards, error } = useSelector((state) => state.boardReducer);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {}, []);

  const handleOnChange = (e) => {
    const newBoardTitle = e.target.value;
    setNewBoardTitle(newBoardTitle);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(createBoard(newBoardTitle));
  };

  return (
    <div className="home-container">
      <div className="home-container__boards">
        {boards?.map((board, index) => {
          return (
            <Link to={`/b/${board.id}/${board.title}`}>
              <button>{board.title}</button>
            </Link>
          );
        })}
      </div>
      <form className="home-container__create-board" onSubmit={handleOnSubmit}>
        <div className="home-container__create-board__title">
          Create a new Board
        </div>
        <input
          type="text"
          placeholder="Your boards title..."
          value={newBoardTitle}
          onChange={handleOnChange}
        />
        <input type="submit" value="Create" />
      </form>
      {error && <span>{error}</span>}
    </div>
  );
}
