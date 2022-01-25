import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import BoardGrid from "./BoardGrid";
import { Box, Grid, Heading } from "@chakra-ui/react";
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
    <>
      <Box mx={5} my={5}>
        <Heading>
          {userData &&
            (userData.user_name
              ? selectFirstName(userData.user_name) + "'s Boards"
              : "Something went wrong")}
        </Heading>
        <Grid mt={5} templateColumns="repeat(5, 1fr)" gap={6}>
          {boards?.length > 0 ? (
            <BoardGrid boards={boards} />
          ) : (
            <h1>No boards created by this user yet</h1>
          )}
        </Grid>
      </Box>
      <Box mx={5} my={5}>
        <Heading>
          {userData &&
            (userData.user_name
              ? "Boards shared with " + selectFirstName(userData.user_name)
              : "Something went wrong")}
        </Heading>
        <Grid mt={5} templateColumns="repeat(5, 1fr)" gap={6}>
          {boards?.length > 0 ? (
            <BoardGrid boards={boards} />
          ) : (
            <h1>No boards shared with this user</h1>
          )}
        </Grid>
      </Box>
    </>
  );
}
