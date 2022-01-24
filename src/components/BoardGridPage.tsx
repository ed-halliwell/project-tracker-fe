import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import BoardGrid from "./BoardGrid";
import { Box, Heading } from "@chakra-ui/react";
import { IBoard } from "../utils/interfaces";

export default function BoardGridPage(): JSX.Element {
  const { userData } = useContext(UserContext);
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      if (userData?.id) {
        try {
          const res = await axios.get(`${baseUrl}/users/${userData.id}/boards`);
          setBoards(res.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBoards();
  }, [userData?.id]);

  const selectFirstName = (fullName: string): string => {
    const arr = fullName.split(" ");
    return arr[0];
  };
  return (
    <Box mx={5} my={5}>
      <Heading>
        {userData &&
          (userData.user_name
            ? selectFirstName(userData.user_name) + "'s Boards"
            : "Something went wrong")}
      </Heading>
      <Box>
        {boards.map((board) => (
          <p key={board.id}>{board.board_name}</p>
        ))}
      </Box>
      <BoardGrid />
    </Box>
  );
}
