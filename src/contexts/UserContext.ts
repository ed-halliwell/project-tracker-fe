import { createContext } from "react";
export const UserContext = createContext<{
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  userId: null,
  setUserId: () => {
    /** */
  },
});
