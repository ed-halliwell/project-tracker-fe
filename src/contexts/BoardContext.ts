import { createContext } from "react";
import { ITotalColumnData } from "../utils/interfaces";

export const BoardContext = createContext<{
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
  column4Data: ITotalColumnData | undefined;
  setColumn4Data: React.Dispatch<
    React.SetStateAction<ITotalColumnData | undefined>
  >;
  column5Data: ITotalColumnData | undefined;
  setColumn5Data: React.Dispatch<
    React.SetStateAction<ITotalColumnData | undefined>
  >;
}>({
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
  column4Data: undefined,
  setColumn4Data: () => {
    /** */
  },
  column5Data: undefined,
  setColumn5Data: () => {
    /** */
  },
});
