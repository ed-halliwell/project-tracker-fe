import { useState, useMemo } from "react";
import { BoardContext } from "../contexts/BoardContext";
import { ITotalColumnData } from "../utils/interfaces";

interface BoardContextWrapperProps {
  children: React.ReactNode;
}

export default function BoardContextWrapper(
  props: BoardContextWrapperProps
): JSX.Element {
  const [column1Data, setColumn1Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column2Data, setColumn2Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column3Data, setColumn3Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column4Data, setColumn4Data] = useState<ITotalColumnData | undefined>(
    undefined
  );
  const [column5Data, setColumn5Data] = useState<ITotalColumnData | undefined>(
    undefined
  );

  const board = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <BoardContext.Provider value={board}>
      {props.children}
    </BoardContext.Provider>
  );
}
