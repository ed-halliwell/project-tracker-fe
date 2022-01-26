import { useState } from "react";
import axios from "axios";
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

  const handlePriorityChange = (
    ticketId: number,
    currentPriority: number,
    type: string
  ) => {
    const baseUrl = process.env.REACT_APP_API_URL;

    let nextHighestPriority: number | undefined;
    let nextLowerPriority: number | undefined;
    let swapTicket: TicketData | undefined;

    if (type === "increase") {
      if (columnData) {
        for (const ticket of columnData?.ticketData) {
          if (ticket.priority_order > currentPriority) {
            if (nextHighestPriority === undefined) {
              nextHighestPriority = ticket.priority_order;
            } else if (ticket.priority_order < nextHighestPriority) {
              nextHighestPriority = ticket.priority_order;
            }
          }
        }
      }

      swapTicket = columnData?.ticketData.find(
        (t) => t.priority_order === nextHighestPriority
      );
    } else if (type === "decrease") {
      if (columnData) {
        for (const ticket of columnData?.ticketData) {
          if (ticket.priority_order < currentPriority) {
            if (nextLowerPriority === undefined) {
              nextLowerPriority = ticket.priority_order;
            } else if (ticket.priority_order > nextLowerPriority) {
              nextLowerPriority = ticket.priority_order;
            }
          }
        }
      }

      swapTicket = columnData?.ticketData.find(
        (t) => t.priority_order === nextLowerPriority
      );
    }

    const swapPriorityValues = async () => {
      if (swapTicket) {
        await axios.patch(
          `${baseUrl}/boards/${columnData?.columnData[0].board_id}/tickets/${ticketId}`,
          {
            priority_order: swapTicket.priority_order,
          }
        );
        await axios.patch(
          `${baseUrl}/boards/${columnData?.columnData[0].board_id}/tickets/${swapTicket.ticket_id}`,
          {
            priority_order: currentPriority,
          }
        );
      }
    };
    if (
      (type === "increase" && nextHighestPriority !== undefined) ||
      (type === "decrease" && nextLowerPriority !== undefined)
    ) {
      console.log("firing inside the if");
      swapPriorityValues();
      handleRefetch((prev) => -prev);
    }
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
        height="90vh"
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
          sx={{ height: "84vh", overflowY: "scroll" }}
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
              handlePriorityChange={handlePriorityChange}
              handleRefetch={handleRefetch}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
