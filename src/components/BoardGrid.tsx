import { Box, Image, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IBoard } from "../utils/interfaces";
import { timestampConverter } from "../utils/timestampConverter";

interface BoardGridProps {
  boards: IBoard[];
}

export default function BoardGrid(props: BoardGridProps): JSX.Element {
  const { boards } = props;
  return (
    <>
      {boards?.length > 0 &&
        boards.map((board) => (
          <GridItem w="100%" h="100%" key={board.id}>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src="https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
              <Box p="4">
                <Box
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  <Link to={`${board.id}`}>{board.board_name}</Link>
                </Box>

                <Box display="flex" mt="2" alignItems="center">
                  <Box as="span" color="gray.600" fontSize="sm">
                    Created{" "}
                    <strong>{timestampConverter(board.created_at)}</strong> by{" "}
                    <strong>{board.created_by}</strong>
                  </Box>
                </Box>
              </Box>
            </Box>
          </GridItem>
        ))}
    </>
  );
}

// https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
// https://images.unsplash.com/photo-1627634777217-c864268db30c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
// https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80
