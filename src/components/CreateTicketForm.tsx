import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
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
  const {
    boardId,
    columnId,
    currentHighestPriority,
    handleFormClose,
    handleRefetch,
  } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");

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
        assigned_to: userData?.id,
        created_by: userData?.id,
        priority_order: currentHighestPriority + 1,
      }
    );
    handleFormClose();
    handleRefetch((prev) => -prev);
  };

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
            mb={1}
            placeholder="Title..."
            size="sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Textarea
            mb={1}
            placeholder="Write a description..."
            size="sm"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          {/* Come back to this and add in board members data */}
          <Select mb={1} size="sm" placeholder="Choose assignee">
            <option value="option1">User 1</option>
            <option value="option2">User 2</option>
            <option value="option3">User 3</option>
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
