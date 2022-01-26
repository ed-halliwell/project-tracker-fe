import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
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
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { TicketData } from "../utils/interfaces";

interface BoardTicketCardProps {
  ticket: TicketData;
  key: number;
  boardId: number;
  handleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function BoardTicketCard(
  props: BoardTicketCardProps
): JSX.Element {
  const { ticket, boardId, handleRefetch } = props;
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
    <Box maxW="sm" borderWidth="1px" borderRadius="md" p={2} mb={2} bg="white">
      <Grid templateRows="3" templateColumns="repeat(6, 1fr)" gap={2}>
        <GridItem colSpan={5}>
          <Box sx={{ display: "flex" }}>
            <Avatar name={ticket.assigned_to_user_name} size="sm" />
            <Box
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              sx={{
                marginLeft: "6px",
                borderBottom: "1px darkgray solid",
                alignSelf: "center",
              }}
            >
              {ticket.ticket_name}
            </Box>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <VStack alignItems="flex-end">
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
                        <Button colorScheme="red" mr={3} onClick={ticketDelete}>
                          Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuList>
              </Menu>
            </Box>
            <VStack>
              <IconButton
                size="xs"
                aria-label="Move up"
                title="Move up"
                variant="outline"
                icon={<ArrowUpIcon />}
              />
              <IconButton
                size="xs"
                aria-label="Move down"
                title="Move down"
                variant="outline"
                icon={<ArrowDownIcon />}
              />
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={5}>
          <VStack alignItems="flex-start">
            <Box as="h4" fontWeight="light" lineHeight="tight" isTruncated>
              {ticket.description}
            </Box>
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
        </GridItem>
      </Grid>
    </Box>
  );
}
