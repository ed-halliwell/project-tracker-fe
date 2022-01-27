import { useState, useMemo } from "react";
import { BoardContext } from "../contexts/BoardContext";
import { ITotalColumnData, IBoard, IBoardMember } from "../utils/interfaces";

interface BoardContextWrapperProps {
  children: React.ReactNode;
}

export default function BoardContextWrapper(
  props: BoardContextWrapperProps
): JSX.Element {
  const [boardData, setBoardData] = useState<IBoard | undefined>(undefined);
  const [boardMembers, setBoardMembers] = useState<IBoardMember[] | undefined>(
    undefined
  );
  const [column1Data, setColumn1Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column2Data, setColumn2Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column3Data, setColumn3Data] = useState<ITotalColumnData | undefined>(
    undefined
  );

  const board = useMemo(
    () => ({
      boardData,
      setBoardData,
      boardMembers,
      setBoardMembers,
      column1Data,
      setColumn1Data,
      column2Data,
      setColumn2Data,
      column3Data,
      setColumn3Data,
    }),
    [
      boardData,
      setBoardData,
      boardMembers,
      setBoardMembers,
      column1Data,
      setColumn1Data,
      column2Data,
      setColumn2Data,
      column3Data,
      setColumn3Data,
    ]
  );

  return (
    <BoardContext.Provider value={board}>
      {props.children}
    </BoardContext.Provider>
  );
}
