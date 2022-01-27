import { useState, useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { TicketData } from "../utils/interfaces";

interface BoardTicketCardProps {
  ticket: TicketData;
  key: number;
  boardId: number;
  columnId: number;
  handleRefetch: React.Dispatch<React.SetStateAction<number>>;
  handlePriorityChange: (
    ticketId: number,
    currentPriority: number,
    type: string
  ) => void;
  handleColumnChange: (ticketId: number, type: string) => void;
}

export default function BoardTicketCard(
  props: BoardTicketCardProps
): JSX.Element {
  const {
    ticket,
    boardId,
    handleRefetch,
    handlePriorityChange,
    handleColumnChange,
  } = props;
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(ticket.ticket_name);
  const [descriptionValue, setDescriptionValue] = useState<string>(
    ticket.description
  );
  const [assignee, setAssignee] = useState<number>(ticket.assigned_to);
  const { boardMembers } = useContext(BoardContext);

  const ticketDelete = async () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    await axios.delete(
      `${baseUrl}/boards/${boardId}/tickets/${ticket.ticket_id}`
    );
    handleRefetch((prev) => -prev);
    onDelClose();
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Edit submit fired");
    const baseUrl = process.env.REACT_APP_API_URL;
    e.preventDefault();
    await axios.patch(
      `${baseUrl}/boards/${boardId}/tickets/${ticket.ticket_id}`,
      {
        ticket_name: inputValue,
        description: descriptionValue,
        assigned_to: assignee,
      }
    );
    setShowEditForm(false);
    handleRefetch((prev) => -prev);
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" p={2} mb={2} bg="white">
      {!showEditForm ? (
        <Box
          sx={{ display: "flex", minWidth: "20rem" }}
          justifyContent="space-between"
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                mb={2}
              >
                <Avatar name={ticket.assigned_to_user_name} size="sm" />
                <Box
                  fontWeight="semibold"
                  as="h4"
                  fontSize="sm"
                  lineHeight="tight"
                  noOfLines={1}
                  isTruncated
                  sx={{
                    marginLeft: "6px",
                    borderBottom: "1px #CBD5E0 solid",
                    alignSelf: "center",
                    whiteSpace: "normal",
                    flexGrow: 4,
                  }}
                >
                  {ticket.ticket_name}
                </Box>
              </Box>

              <VStack alignItems="flex-start" justifyContent="space-between">
                <Text
                  fontSize="sm"
                  noOfLines={4}
                  isTruncated
                  maxWidth="100%"
                  sx={{ whiteSpace: "normal", flexGrow: 4 }}
                >
                  {ticket.description}
                </Text>

                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  fontSize="xs"
                  justifySelf="flex-end"
                >
                  Added by {ticket.user_name}
                </Box>
              </VStack>
            </Box>
          </Box>

          <VStack ml={2} spacing={0}>
            <Box>
              <Menu size="xs">
                <MenuButton
                  as={IconButton}
                  size="xs"
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem onClick={() => setShowEditForm(true)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={onDelOpen}>Delete</MenuItem>

                  <Modal isOpen={isDelOpen} onClose={onDelClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Are you sure?</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Deleting this ticket cannot be undone.
                      </ModalBody>

                      <ModalFooter>
                        <Button mr={3} variant="ghost" onClick={onDelClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={ticketDelete}>
                          Delete
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <IconButton
                size="xs"
                aria-label="Move up"
                title="Move up"
                variant="ghost"
                icon={<ArrowUpIcon />}
                onClick={() =>
                  handlePriorityChange(
                    ticket.ticket_id,
                    ticket.priority_order,
                    "increase"
                  )
                }
              />
            </Box>
            <Box>
              <IconButton
                size="xs"
                aria-label="Move to next column"
                title="Move to next column"
                variant="ghost"
                icon={<ArrowForwardIcon />}
                onClick={() => handleColumnChange(ticket.ticket_id, "forward")}
              />
            </Box>
            <Box>
              <IconButton
                size="xs"
                aria-label="Move to previous column"
                title="Move to previous column"
                variant="ghost"
                icon={<ArrowBackIcon />}
                onClick={() => handleColumnChange(ticket.ticket_id, "back")}
              />
            </Box>

            <Box>
              <IconButton
                size="xs"
                aria-label="Move down"
                title="Move down"
                variant="ghost"
                icon={<ArrowDownIcon />}
                onClick={() =>
                  handlePriorityChange(
                    ticket.ticket_id,
                    ticket.priority_order,
                    "decrease"
                  )
                }
              />
            </Box>
          </VStack>
        </Box>
      ) : (
        <Box>
          <Box
            maxW="sm"
            border="1px #3182CE solid"
            borderRadius="md"
            p={2}
            mb={2}
            bg="white"
          >
            <form onSubmit={handleEditSubmit}>
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
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="xs" colorScheme="blue">
                  Create
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
}
