import { useState, useMemo } from "react";
import { BoardContext } from "../contexts/BoardContext";
import { IBoardTickets } from "../utils/interfaces";

interface BoardContextWrapperProps {
  children: React.ReactNode;
}

export default function BoardContextWrapper(
  props: BoardContextWrapperProps
): JSX.Element {
  const [column1Tickets, setColumn1Tickets] = useState<IBoardTickets[]>([]);
  const [column2Tickets, setColumn2Tickets] = useState<IBoardTickets[]>([]);
  const [column3Tickets, setColumn3Tickets] = useState<IBoardTickets[]>([]);
  const [column4Tickets, setColumn4Tickets] = useState<IBoardTickets[]>([]);
  const [column5Tickets, setColumn5Tickets] = useState<IBoardTickets[]>([]);

  const board = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <BoardContext.Provider value={board}>
      {props.children}
    </BoardContext.Provider>
  );
}
