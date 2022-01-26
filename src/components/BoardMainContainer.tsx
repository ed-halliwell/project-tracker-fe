import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import BoardColumn from "./BoardColumn";
import { IBoard } from "../utils/interfaces";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";

export default function BoardMainContainer(): JSX.Element {
  const params = useParams();
  const board_id = params.board_id ? parseInt(params.board_id, 10) : 0;
  const [boardData, setBoardData] = useState<IBoard | undefined>();
  const [refetch, setRefetch] = useState<number>(1);
  const {
    column1Data,
    setColumn1Data,
    column2Data,
    setColumn2Data,
    column3Data,
    setColumn3Data,
    column4Data,
    setColumn4Data,
    column5Data,
    setColumn5Data,
  } = useContext(BoardContext);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/boards/${board_id}`);
        setBoardData(res.data.data[0]);
      } catch (error) {
        console.error(error);
      }

      try {
        const res = await axios.get(
          `${baseUrl}/boards/${board_id}/column_data`
        );

        const columnArray = res.data.data.map(
          (a: { column_ids: number }) => a.column_ids
        );

        const fetchAndSetColumnData = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );

          switch (column_id) {
            case 1:
              setColumn1Data(res.data);
              break;
            case 2:
              setColumn2Data(res.data);
              break;
            case 3:
              setColumn3Data(res.data);
              break;
            case 4:
              setColumn4Data(res.data);
              break;
            case 5:
              setColumn5Data(res.data);
              break;
          }
        };
        columnArray.forEach((columnId: number) => {
          fetchAndSetColumnData(columnId);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoardData();
  }, [
    board_id,
    setColumn1Data,
    setColumn2Data,
    setColumn3Data,
    setColumn4Data,
    setColumn5Data,
    refetch,
  ]);

  return (
    <Box m={5}>
      {boardData && <Heading mb={3}>{boardData.board_name}</Heading>}
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="94vh">
          <BoardColumn columnData={column1Data} handleRefetch={setRefetch} />
        </GridItem>
        <GridItem w="100%" h="94vh">
          <BoardColumn columnData={column2Data} handleRefetch={setRefetch} />
        </GridItem>
        <GridItem w="100%" h="94vh">
          <BoardColumn columnData={column3Data} handleRefetch={setRefetch} />
        </GridItem>
        <GridItem w="100%" h="94vh">
          <BoardColumn columnData={column4Data} handleRefetch={setRefetch} />
        </GridItem>
        <GridItem w="100%" h="94vh">
          <BoardColumn columnData={column5Data} handleRefetch={setRefetch} />
        </GridItem>
      </Grid>
    </Box>
  );
}
