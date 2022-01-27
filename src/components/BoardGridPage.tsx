import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import BoardGrid from "./BoardGrid";
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { IBoard } from "../utils/interfaces";

export default function BoardGridPage(): JSX.Element {
  const { userData } = useContext(UserContext);
  const [ownedBoards, setOwnedBoards] = useState<IBoard[]>([]);
  const [sharedBoards, setSharedBoards] = useState<IBoard[]>([]);
  const [refetchBoards, setRefetchBoards] = useState<number>(1);
  const [boardName, setBoardName] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBoards = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      if (userData?.id) {
        try {
          const res = await axios.get(`${baseUrl}/users/${userData.id}/boards`);
          setOwnedBoards(res.data.ownedBoards);
          setSharedBoards(res.data.sharedBoards);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchBoards();
  }, [userData?.id, refetchBoards]);

  const selectFirstName = (fullName: string): string => {
    const arr = fullName.split(" ");
    return arr[0];
  };

  const handleCreateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_URL;
    await axios.post(`${baseUrl}/boards`, {
      user_id: userData?.id,
      board_name: boardName,
    });
    onClose();
    setRefetchBoards((prev) => -prev);
  };

  return (
    <>
      <Box mx={5} my={5}>
        <HStack sx={{ justifyContent: "space-between" }}>
          <Heading>
            {userData &&
              (userData.user_name
                ? selectFirstName(userData.user_name) + "'s Boards"
                : "Something went wrong")}
          </Heading>
          <Button variant="solid" colorScheme="blue" onClick={onOpen}>
            Create New Board
          </Button>
        </HStack>
        <Grid mt={5} templateColumns="repeat(5, 1fr)" gap={6}>
          {ownedBoards?.length > 0 ? (
            <BoardGrid boards={ownedBoards} />
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
          {sharedBoards?.length > 0 ? (
            <BoardGrid boards={sharedBoards} />
          ) : (
            <h1>No boards shared with this user</h1>
          )}
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <form onSubmit={(e) => handleCreateBoard(e)}>
                <Input
                  isRequired
                  mb={1}
                  placeholder="Name your board..."
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    mt={2}
                    colorScheme="blue"
                    onClick={onClose}
                    size="sm"
                  >
                    Create Board
                  </Button>
                </Box>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
