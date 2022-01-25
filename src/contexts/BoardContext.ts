import { createContext } from "react";
import { IBoardTickets } from "../utils/interfaces";

export const BoardContext = createContext<{
  column1Tickets: IBoardTickets[];
  setColumn1Tickets: React.Dispatch<React.SetStateAction<IBoardTickets[]>>;
  column2Tickets: IBoardTickets[];
  setColumn2Tickets: React.Dispatch<React.SetStateAction<IBoardTickets[]>>;
  column3Tickets: IBoardTickets[];
  setColumn3Tickets: React.Dispatch<React.SetStateAction<IBoardTickets[]>>;
  column4Tickets: IBoardTickets[];
  setColumn4Tickets: React.Dispatch<React.SetStateAction<IBoardTickets[]>>;
  column5Tickets: IBoardTickets[];
  setColumn5Tickets: React.Dispatch<React.SetStateAction<IBoardTickets[]>>;
}>({
  column1Tickets: [],
  setColumn1Tickets: () => {
    /** */
  },
  column2Tickets: [],
  setColumn2Tickets: () => {
    /** */
  },
  column3Tickets: [],
  setColumn3Tickets: () => {
    /** */
  },
  column4Tickets: [],
  setColumn4Tickets: () => {
    /** */
  },
  column5Tickets: [],
  setColumn5Tickets: () => {
    /** */
  },
});
