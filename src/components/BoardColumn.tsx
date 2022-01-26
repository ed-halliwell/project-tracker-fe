import { useState } from "react";
import { ITotalColumnData, TicketData } from "../utils/interfaces";
import {
  Box,
  Circle,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import BoardTicketCard from "./BoardTicketCard";
import CreateTicketForm from "./CreateTicketForm";
import "../styles/BoardMainStyles.css";

interface BoardColumnProps {
  columnData: ITotalColumnData | undefined;
  handleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function BoardColumn(props: BoardColumnProps): JSX.Element {
  const { columnData, handleRefetch } = props;
  const [showNewTicketForm, setShowNewTicketForm] = useState<boolean>(false);

  const handlePlusIconClick = () => {
    setShowNewTicketForm(true);
  };

  const handleFormClose = () => {
    setShowNewTicketForm(false);
  };

  const findHighestPriority = (
    ticketData: TicketData[] | undefined
  ): number => {
    let highestPriorityValue = 0;
    if (ticketData) {
      ticketData.forEach((t) => {
        if (t.priority_order > highestPriorityValue) {
          highestPriorityValue = t.priority_order;
        }
      });
    }
    return highestPriorityValue;
  };

  return (
    <>
      <Box
        maxW="sm"
        bgColor="#F7FAFC"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={3}
        height="100%"
      >
        <HStack pb={2} justify="space-between">
          <Box sx={{ display: "flex" }}>
            <Circle size="20px" bg="gray.700" color="white">
              <Text>{columnData && columnData.ticketData.length}</Text>
            </Circle>

            <Heading as="h3" size="sm" isTruncated pl={2}>
              {columnData?.columnData[0].column_name}
            </Heading>
          </Box>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Create new ticket"
            title="Create new ticket"
            onClick={handlePlusIconClick}
            icon={<AddIcon />}
          />
        </HStack>

        <Box
          maxW="sm"
          bgColor="white"
          borderWidth="1px"
          borderRadius="md"
          p={1}
          sx={{ height: "100%", overflowY: "scroll" }}
        >
          {showNewTicketForm && (
            <CreateTicketForm
              handleFormClose={handleFormClose}
              handleRefetch={handleRefetch}
              boardId={columnData?.columnData[0].board_id}
              columnId={columnData?.columnData[0].column_id}
              currentHighestPriority={findHighestPriority(
                columnData?.ticketData
              )}
            />
          )}

          {columnData?.ticketData.map((ticket) => (
            <BoardTicketCard
              key={ticket.ticket_id}
              ticket={ticket}
              boardId={columnData.columnData[0].board_id}
              columnId={columnData.columnData[0].column_id}
              handleRefetch={handleRefetch}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
