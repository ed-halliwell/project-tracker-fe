import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  IconButton,
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
  Text,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ticketDelete = async () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    await axios.delete(
      `${baseUrl}/boards/${boardId}/tickets/${ticket.ticket_id}`
    );
    handleRefetch((prev) => -prev);
    onClose();
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" p={0} mb={2} bg="white">
      <VStack>
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
          <Box
            sx={{ display: "flex", minWidth: "20rem" }}
            justifyContent="space-between"
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="xs"
                aria-label="Move to previous column"
                title="Move to previous column"
                variant="ghost"
                icon={<ArrowBackIcon />}
                onClick={() => handleColumnChange(ticket.ticket_id, "back")}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 10,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
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

                  <Box ml={2}>
                    <Menu size="xs">
                      <MenuButton
                        as={IconButton}
                        size="xs"
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem onClick={onOpen}>Delete</MenuItem>

                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Are you sure?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              Deleting this ticket cannot be undone.
                            </ModalBody>

                            <ModalFooter>
                              <Button mr={3} variant="ghost" onClick={onClose}>
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
                </Box>
                <Box>
                  <VStack
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <Text
                      fontSize="sm"
                      noOfLines={5}
                      isTruncated
                      maxWidth="100%"
                      lineHeight="tight"
                      sx={{ whiteSpace: "normal" }}
                    >
                      {ticket.description}
                    </Text>

                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      justifySelf="flex-end"
                    >
                      Added by {ticket.user_name}
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="xs"
                aria-label="Move to next column"
                title="Move to next column"
                variant="ghost"
                icon={<ArrowForwardIcon />}
                onClick={() => handleColumnChange(ticket.ticket_id, "forward")}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            sx={{ padding: 0 }}
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
  );
}
