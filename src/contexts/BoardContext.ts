import { createContext } from "react";
import { ITotalColumnData, IBoard, IBoardMember } from "../utils/interfaces";

export const BoardContext = createContext<{
  boardData: IBoard | undefined;
  setBoardData: React.Dispatch<React.SetStateAction<IBoard | undefined>>;
  boardMembers: IBoardMember[] | undefined;
  setBoardMembers: React.Dispatch<
    React.SetStateAction<IBoardMember[] | undefined>
  >;
  column1Data: ITotalColumnData | undefined;
  setColumn1Data: React.Dispatch<
    React.SetStateAction<ITotalColumnData | undefined>
  >;
  column2Data: ITotalColumnData | undefined;
  setColumn2Data: React.Dispatch<
    React.SetStateAction<ITotalColumnData | undefined>
  >;
  column3Data: ITotalColumnData | undefined;
  setColumn3Data: React.Dispatch<
    React.SetStateAction<ITotalColumnData | undefined>
  >;
}>({
  boardData: undefined,
  setBoardData: () => {
    /** */
  },
  boardMembers: undefined,
  setBoardMembers: () => {
    /** */
  },
  column1Data: undefined,
  setColumn1Data: () => {
    /** */
  },
  column2Data: undefined,
  setColumn2Data: () => {
    /** */
  },
  column3Data: undefined,
  setColumn3Data: () => {
    /** */
  },
});
