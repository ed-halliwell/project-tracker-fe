import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

interface CreateTicketFormProps {
  boardId: number | undefined;
  columnId: number | undefined;
  currentHighestPriority: number;
  handleFormClose: () => void;
  handleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreateTicketForm(
  props: CreateTicketFormProps
): JSX.Element {
  const { userData } = useContext(UserContext);
  const { boardMembers } = useContext(BoardContext);
  const {
    boardId,
    columnId,
    currentHighestPriority,
    handleFormClose,
    handleRefetch,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [assignee, setAssignee] = useState<number>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    e.preventDefault();
    await axios.post(
      `${baseUrl}/boards/${boardId}/columns/${columnId}/tickets`,
      {
        board_id: boardId,
        column_id: columnId,
        ticket_name: inputValue,
        description: descriptionValue,
        assigned_to: assignee,
        created_by: userData?.id,
        priority_order: currentHighestPriority + 1,
      }
    );
    handleFormClose();
    handleRefetch((prev) => -prev);
  };
  console.log(boardMembers);

  return (
    <Box
      maxW="sm"
      border="1px #3182CE solid"
      borderRadius="md"
      p={2}
      mb={2}
      bg="white"
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            isRequired
            mb={1}
            placeholder="Title..."
            size="sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Textarea
            isRequired
            mb={1}
            placeholder="Write a description..."
            size="sm"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Select
            isRequired
            mb={1}
            size="sm"
            placeholder="Choose assignee"
            required
            value={assignee}
            onChange={(e) => setAssignee(Number(e.target.value))}
          >
            {boardMembers?.map((member) => {
              return (
                <option key={member.user_id} value={member.user_id}>
                  {member.user_name} ({member.member_role})
                </option>
              );
            })}
          </Select>
        </FormControl>
        <HStack justify="right">
          <Button
            type="button"
            size="xs"
            variant="outline"
            colorScheme="blue"
            onClick={handleFormClose}
          >
            Cancel
          </Button>
          <Button type="submit" size="xs" colorScheme="blue">
            Create
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
