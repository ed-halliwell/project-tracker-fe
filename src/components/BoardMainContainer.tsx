import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";
import BoardColumn from "./BoardColumn";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IUser } from "../utils/interfaces";

export default function BoardMainContainer(): JSX.Element {
  const params = useParams();
  const board_id = params.board_id ? parseInt(params.board_id, 10) : 0;
  const [refetch, setRefetch] = useState<number>(1);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<number>();
  const [selectedUserToRemove, setSelectedUserToRemove] = useState<number>();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [roleChoice, setRoleChoice] = useState<string>("");
  const {
    isOpen: isBMOpen,
    onOpen: onBMOpen,
    onClose: onBMClose,
  } = useDisclosure();
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  const { userData } = useContext(UserContext);
  const {
    boardData,
    setBoardData,
    boardMembers,
    setBoardMembers,
    column1Data,
    setColumn1Data,
    column2Data,
    setColumn2Data,
    column3Data,
    setColumn3Data,
  } = useContext(BoardContext);

  const history = useNavigate();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/boards/${board_id}`);
        setBoardData(res.data.data[0]);
      } catch (error) {
        console.error(error);
      }

      try {
        const res = await axios.get(
          `${baseUrl}/boards/${board_id}/board_members`
        );
        setBoardMembers(res.data.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const res = await axios.get(
          `${baseUrl}/boards/${board_id}/column_data`
        );

        interface ColumnIDAndOrder {
          column_id: number;
          column_order: number;
        }

        const columnsInAscOrder = res.data.data.sort(
          (a: ColumnIDAndOrder, b: ColumnIDAndOrder) =>
            a.column_order - b.column_order
        );

        const fetchAndSetColumn1Data = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );
          setColumn1Data(res.data);
        };
        const fetchAndSetColumn2Data = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );
          setColumn2Data(res.data);
        };
        const fetchAndSetColumn3Data = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );
          setColumn3Data(res.data);
        };

        fetchAndSetColumn1Data(columnsInAscOrder[0].column_id);
        fetchAndSetColumn2Data(columnsInAscOrder[1].column_id);
        fetchAndSetColumn3Data(columnsInAscOrder[2].column_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoardData();

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        setAllUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [
    board_id,
    setColumn1Data,
    setColumn2Data,
    setColumn3Data,
    refetch,
    setBoardData,
    setBoardMembers,
  ]);
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleAddBoardMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/boards/${board_id}/board_members`, {
      user_id: selectedUserToAdd,
      member_role: roleChoice,
    });
    onBMClose();
    setRefetch((prev) => -prev);
  };

  const handleRemoveBoardMember = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await axios.delete(
      `${baseUrl}/boards/${board_id}/board_members/${selectedUserToRemove}`
    );
    onBMClose();
    setRefetch((prev) => -prev);
  };

  const handleDeleteBoard = async () => {
    const res = await axios.delete(`${baseUrl}/boards/${board_id}`);
    console.log(res);
    history("/boards");
  };

  return (
    <>
      <Container maxW="container.xl">
        {boardData && (
          <HStack justifyContent="space-between">
            <Heading my={3}>{boardData.board_name}</Heading>
            <Box>
              <Button onClick={onBMOpen}>Edit Board Members</Button>
              {userData?.id === boardData.created_by && (
                <Button onClick={onDelOpen} ml={3} colorScheme="red">
                  Delete Board
                </Button>
              )}
            </Box>
          </HStack>
        )}

        <Grid
          templateColumns="repeat(3, 1fr)"
          sx={{ display: "flex", justifyContent: "center" }}
          gap={8}
        >
          <GridItem>
            <BoardColumn columnData={column1Data} handleRefetch={setRefetch} />
          </GridItem>
          <GridItem>
            <BoardColumn columnData={column2Data} handleRefetch={setRefetch} />
          </GridItem>
          <GridItem>
            <BoardColumn columnData={column3Data} handleRefetch={setRefetch} />
          </GridItem>
        </Grid>
      </Container>
      <Modal isOpen={isBMOpen} onClose={onBMClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Board Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Add a board member:</Text>
              <form onSubmit={(e) => handleAddBoardMember(e)}>
                <Select
                  placeholder="Select a user to add"
                  size="sm"
                  value={selectedUserToAdd}
                  onChange={(e) => setSelectedUserToAdd(Number(e.target.value))}
                >
                  {allUsers
                    ?.filter((user) => {
                      return !boardMembers
                        ?.map((m) => m.user_id)
                        .includes(user.id)
                        ? user
                        : false;
                    })
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.user_name}
                      </option>
                    ))}
                </Select>
                <Select
                  placeholder="Choose their role"
                  mt={2}
                  size="sm"
                  value={roleChoice}
                  onChange={(e) => setRoleChoice(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Team Member">Team Member</option>
                  <option value="Viewer">Viewer</option>
                </Select>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    mt={2}
                    colorScheme="blue"
                    onClick={onBMClose}
                    size="sm"
                  >
                    Add board member
                  </Button>
                </Box>
              </form>
            </Box>
            <Box mt={5}>
              <Text>Remove a board member:</Text>
              <form onSubmit={(e) => handleRemoveBoardMember(e)}>
                <Select
                  placeholder="Select a user to remove"
                  size="sm"
                  value={selectedUserToRemove}
                  onChange={(e) =>
                    setSelectedUserToRemove(Number(e.target.value))
                  }
                >
                  {boardMembers
                    ?.filter((user) => user.member_role !== "Owner")
                    .map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.user_name} ({user.member_role})
                      </option>
                    ))}
                </Select>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    mt={2}
                    colorScheme="red"
                    onClick={onBMClose}
                    size="sm"
                  >
                    Remove board member
                  </Button>
                </Box>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDelOpen} onClose={onDelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            All tickets on this board will also be deleted. This action cannot
            be undone.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDelClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteBoard}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
