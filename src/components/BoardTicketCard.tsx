import { Avatar, Box, HStack } from "@chakra-ui/react";
import { TicketData } from "../utils/interfaces";

interface BoardTicketCardProps {
  ticket: TicketData;
}

export default function BoardTicketCard(
  props: BoardTicketCardProps
): JSX.Element {
  const { ticket } = props;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" p={2} mb={2} bg="white">
      <HStack justify="space-between">
        <Box
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          sx={{
            borderBottom: "1px darkgray solid",
            alignSelf: "flex-start",
          }}
        >
          {ticket.ticket_name}
        </Box>
        <Avatar name={ticket.assigned_to_user_name} size="sm" />
      </HStack>
      <Box as="h4" fontWeight="light" lineHeight="tight" isTruncated>
        {ticket.description}
      </Box>

      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        Added by {ticket.user_name}
      </Box>
    </Box>
  );
}
