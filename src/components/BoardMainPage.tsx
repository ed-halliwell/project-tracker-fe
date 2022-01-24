import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IBoardTickets } from "../utils/interfaces";

export default function BoardMainPage(): JSX.Element {
  const params = useParams();
  const board_id = params.board_id ? parseInt(params.board_id, 10) : 0;
  const user_id = params.user_id ? parseInt(params.user_id, 10) : 0;
  const [boardData, setBoardData] = useState<IBoardTickets[]>([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchBoardData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/users/${user_id}/boards/${board_id}/tickets`
        );
        setBoardData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoardData();
  }, []);

  return <h1>Board Main Page</h1>;
}
