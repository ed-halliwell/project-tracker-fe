import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<string>();
  const [selectedUserToRemove, setSelectedUserToRemove] = useState<string>();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [roleChoice, setRoleChoice] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

        const columnArray = res.data.data.map(
          (a: { column_ids: number }) => a.column_ids
        );

        const fetchAndSetColumnData = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );

          switch (column_id) {
            case 1:
              setColumn1Data(res.data);
              break;
            case 2:
              setColumn2Data(res.data);
              break;
            case 3:
              setColumn3Data(res.data);
              break;
          }
        };
        columnArray.forEach((columnId: number) => {
          fetchAndSetColumnData(columnId);
        });
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

  return (
    <>
      <Container maxW="container.xl">
        {boardData && (
          <HStack justifyContent="space-between">
            <Heading my={3}>{boardData.board_name}</Heading>
            <Button onClick={onOpen}>Edit Board Members</Button>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Board Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Add a board member:</Text>

              <Select
                placeholder="Select a user to add"
                size="sm"
                value={selectedUserToAdd}
                onChange={(e) => setSelectedUserToAdd(e.target.value)}
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
                <Button mt={2} colorScheme="blue" onClick={onClose} size="sm">
                  Add board member
                </Button>
              </Box>
            </Box>
            <Box mt={5}>
              <Text>Remove a board member:</Text>

              <Select
                placeholder="Select a user to remove"
                size="sm"
                value={selectedUserToRemove}
                onChange={(e) => setSelectedUserToRemove(e.target.value)}
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
                <Button mt={2} colorScheme="red" onClick={onClose} size="sm">
                  Remove board member
                </Button>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
