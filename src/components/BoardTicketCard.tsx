import {
  Avatar,
  Box,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { TicketData } from "../utils/interfaces";

interface BoardTicketCardProps {
  ticket: TicketData;
  key: number;
}

export default function BoardTicketCard(
  props: BoardTicketCardProps
): JSX.Element {
  const { ticket } = props;
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
            <Menu flip={false} size="xs" direction="rtl">
              <MenuButton
                as={IconButton}
                size="xs"
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
            <VStack>
              <IconButton
                size="xs"
                aria-label="Create new ticket"
                title="Create new ticket"
                variant="outline"
                icon={<ArrowUpIcon />}
              />
              <IconButton
                size="xs"
                aria-label="Create new ticket"
                title="Create new ticket"
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
