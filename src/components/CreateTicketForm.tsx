import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface CreateTicketFormProps {
  handleFormCancel: () => void;
  boardId: number | undefined;
  columnId: number | undefined;
}

export default function CreateTicketForm(
  props: CreateTicketFormProps
): JSX.Element {
  const { boardId, columnId, handleFormCancel } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");

  const handleSubmit = async () => {
    console.log(inputValue, descriptionValue);
    const baseUrl = process.env.REACT_APP_API_URL;
    const res = await axios.post(
      `${baseUrl}/boards/${boardId}/columns/${columnId}`
    );
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
        <HStack justify="right">
          <Button
            type="button"
            size="xs"
            variant="outline"
            colorScheme="blue"
            onClick={handleFormCancel}
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
