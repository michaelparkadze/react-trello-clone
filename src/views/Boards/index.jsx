import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CreateBoardModal from "../../components/CreateBoardModal";
import { mergeDataWithKey } from "../../utils";
import { db, auth, firebase } from "../../firebase";
import { Button } from "antd";
import { UserContext } from "../../providers/UserProvider";

function Boards(props) {
  const user = useContext(UserContext);
  // const { authenticated } = props;
  // const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { boards, error } = useSelector((state) => state.boardReducer);
  // const [newBoardTitle, setNewBoardTitle] = useState("");

  // useEffect(() => {}, []);
  // const handleOnChange = (e) => {
  //   const newBoardTitle = e.target.value;
  //   setNewBoardTitle(newBoardTitle);
  // };

  // Get boards
  useEffect(() => {
    console.log(props);
    // setLoading(true);
    db.onceGetBoards()
      .then((snapshot) => {
        if (!snapshot.val()) {
          return;
        }
        setBoards(mergeDataWithKey(snapshot.val()));
      })
      .catch((err) => {
        console.log("erorr");
        console.error(err);
      });

    // .then((snapshot) => {
    //   console.log("something");
    //   if (!snapshot.val()) {
    //     return;
    //   } else {
    //     console.log("setting boards data");
    //     setBoards(mergeDataWithKey(snapshot.val()));
    //   }
    // })
    // .finally(() => {
    //   console.log("shit");
    //   setLoading(false);
    // });
  }, []);

  // Create a new board
  const handleCreateBoard = (board) => {
    // console.log(board);
    db.doCreateBoard(board).then((response) => {
      console.log(response);
      let updatedBoards = boards;
      updatedBoards.push(response);
      setBoards(updatedBoards);
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      aye
      {boards?.map((board, index) => {
        return (
          <Link to={`b/${board.key}/${board.title}`} key={index}>
            <div>{board.title}</div>
          </Link>
        );
      })}
      <CreateBoardModal
        onCreateBoard={handleCreateBoard}
        onCloseModal={handleModalClose}
        visible={modalOpen}
      />
      <Button onClick={() => handleModalOpen()}>Create a board</Button>
      <Button onClick={() => console.log(boards)}>Check boards</Button>
      <Button onClick={auth.doSignOut}>Sign out</Button>
    </div>
  );

  // return (
  //   <div className="home-container">
  //     <div className="home-container__boards">
  //       {boards?.map((board, index) => {
  //         return (
  //           <Link to={`/b/${board.id}/${board.title}`}>
  //             <button>{board.title}</button>
  //           </Link>
  //         );
  //       })}
  //     </div>
  //     <form className="home-container__create-board" onSubmit={handleOnSubmit}>
  //       <div className="home-container__create-board__title">
  //         Create a new Board
  //       </div>
  //       <input
  //         type="text"
  //         placeholder="Your boards title..."
  //         value={newBoardTitle}
  //         onChange={handleOnChange}
  //       />
  //       <input type="submit" value="Create" />
  //     </form>
  //     {error && <span>{error}</span>}
  //   </div>
  // );
}

export default Boards;
