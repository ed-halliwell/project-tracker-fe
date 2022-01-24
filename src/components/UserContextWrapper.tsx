import { useState, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
import { IUser } from "../utils/interfaces";

interface UserContextWrapperProps {
  children: React.ReactNode;
}

export default function UserContextWrapper(
  props: UserContextWrapperProps
): JSX.Element {
  const [userData, setUserData] = useState<IUser | undefined>(undefined);

  const user = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
