import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import { IBoardTickets } from "../utils/interfaces";

export default function BoardMainContainer(): JSX.Element {
  const params = useParams();
  const board_id = params.board_id ? parseInt(params.board_id, 10) : 0;
  const {
    column1Tickets,
    setColumn1Tickets,
    column2Tickets,
    setColumn2Tickets,
    column3Tickets,
    setColumn3Tickets,
    column4Tickets,
    setColumn4Tickets,
    column5Tickets,
    setColumn5Tickets,
  } = useContext(BoardContext);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    console.log("UseEffect for board data firing");
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/boards/${board_id}/column_data`
        );
        const columnArray = res.data.data.map((a: any) => a.column_ids);

        const fetchAndSetColumnData = async (column_id: number) => {
          const res = await axios.get(
            `${baseUrl}/boards/${board_id}/columns/${column_id}`
          );

          switch (column_id) {
            case 1:
              setColumn1Tickets(res.data.data);
              break;
            case 2:
              setColumn2Tickets(res.data.data);
              break;
            case 3:
              setColumn3Tickets(res.data.data);
              break;
            case 4:
              setColumn4Tickets(res.data.data);
              break;
            case 5:
              setColumn5Tickets(res.data.data);
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
  }, []);

  return (
    <div>
      Column 1
      <ul>
        {column1Tickets.map((ticket) => (
          <li key={ticket.ticket_id}>
            <p>{ticket.ticket_id}</p>
            <p>{ticket.column_id}</p>
            <p>{ticket.ticket_name}</p>
            <p>{ticket.description}</p>
            <p>{ticket.assigned_to_user_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
