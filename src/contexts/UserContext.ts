import { createContext } from "react";
import { IUser } from "../utils/interfaces";

export const UserContext = createContext<{
  userData: IUser | undefined;
  setUserData: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}>({
  userData: undefined,
  setUserData: () => {
    /** */
  },
});
