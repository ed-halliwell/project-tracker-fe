import { ITotalColumnData } from "../utils/interfaces";
import { Avatar, Box, Circle, Heading, HStack, Text } from "@chakra-ui/react";

interface BoardColumnProps {
  columnData: ITotalColumnData | undefined;
}

export default function BoardColumn(props: BoardColumnProps): JSX.Element {
  const { columnData } = props;
  console.log(columnData);
  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={3}
        height="80vh"
      >
        <HStack pb={2}>
          <Circle size="20px" bg="gray.700" color="white">
            <Text>{columnData && columnData.ticketData.length}</Text>
          </Circle>

          <Heading as="h3" size="sm" isTruncated>
            {columnData?.columnData[0].column_name}
          </Heading>
        </HStack>
        <Box maxW="sm" borderWidth="1px" borderRadius="md" p={1} height="100%">
          {columnData?.ticketData.map((ticket) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="md"
              p={2}
              mb={2}
              key={ticket.ticket_id}
            >
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
          ))}
        </Box>
      </Box>
    </>
  );
}
