import axios from "axios";
import { ITotalColumnData } from "../utils/interfaces";
import { Box, Circle, Heading, HStack, Text } from "@chakra-ui/react";
import BoardTicketCard from "./BoardTicketCard";
import { Container as DragContainer, Draggable } from "react-smooth-dnd";
import "../styles/BoardMainStyles.css";

interface BoardColumnProps {
  columnData: ITotalColumnData | undefined;
}

export default function BoardColumn(props: BoardColumnProps): JSX.Element {
  const { columnData } = props;

  function onCardDrop(columnId: number | undefined, dropResult: any) {
    const { removedIndex, addedIndex, payload, element } = dropResult;
    console.log(columnId, removedIndex, addedIndex, payload, element);
    // if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    //   const updateTicketOnDB = async () => {
    //     try {
    //       const baseUrl = process.env.REACT_APP_API_URL;
    //       const res = await axios.get(
    //         `${baseUrl}/boards/${columnData?.columnData[0].board_id}/tickets/${payload.}`
    //       );
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   updateTicketOnDB
  }

  function grabCardData(index: number) {
    return columnData?.ticketData[index];
  }

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
          <DragContainer
            orientation="vertical"
            groupName="board"
            dragClass="being-dragged"
            dropClass="drop-class"
            onDrop={(e) => onCardDrop(columnData?.columnData[0].column_id, e)}
            getChildPayload={(index) => grabCardData(index)}
          >
            {columnData?.ticketData
              .sort((a, b) => {
                return a.priority_order - b.priority_order;
              })
              .map((ticket) => (
                <Draggable key={ticket.ticket_id}>
                  <BoardTicketCard ticket={ticket} />
                </Draggable>
              ))}
          </DragContainer>
        </Box>
      </Box>
    </>
  );
}
