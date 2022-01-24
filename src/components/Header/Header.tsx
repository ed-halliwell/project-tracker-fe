import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Select,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import { UserContext } from "../../contexts/UserContext";
import { IUser } from "../../utils/interfaces";

export default function Header(): JSX.Element {
  const { userData, setUserData } = useContext(UserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | undefined>(
    undefined
  );
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem("loggedInUser");
    if (userInLocalStorage) {
      setUserData(JSON.parse(userInLocalStorage));
    }

    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        setUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [setUserData]);

  const handleLoginCancel = () => {
    setSelectedUser(undefined);
    setShowLoginForm(false);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const userToLogIn = users
      ? users.find((user) => selectedUser === user.id)
      : undefined;
    setUserData(userToLogIn);
    localStorage.setItem("loggedInUser", JSON.stringify(userToLogIn));
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setSelectedUser(undefined);
    setShowLoginForm(false);
    setUserData(undefined);
  };

  return (
    <HStack
      w="100%"
      h="4rem"
      bg="blue.800"
      color="white"
      sx={{ justifyContent: "space-between" }}
      px={5}
    >
      <HStack divider={<StackDivider borderColor="gray.200" />}>
        <Box>
          <Heading as="h1" size="xl">
            Project Tracker
          </Heading>
        </Box>
        {userData && (
          <Link to="boards">
            <Button variant="solid" bg="blue.800">
              Boards
            </Button>
          </Link>
        )}
      </HStack>

      {!showLoginForm && !userData && (
        <Box>
          <Button
            colorScheme="blue"
            variant="outline"
            bg="white"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </Button>
        </Box>
      )}
      {showLoginForm && (
        <Box>
          <HStack>
            <form onSubmit={(e) => handleLogin(e)}>
              <FormControl>
                <HStack>
                  <Select
                    placeholder="Select a user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(Number(e.target.value))}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.user_name}
                      </option>
                    ))}
                  </Select>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    bg="white"
                    type="submit"
                  >
                    Login
                  </Button>
                </HStack>
              </FormControl>
            </form>
            <Button
              colorScheme="red"
              variant="outline"
              bg="white"
              type="button"
              onClick={handleLoginCancel}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {userData && (
        <Box>
          <HStack>
            <Text mr={3}>
              Logged in as <strong>{userData.user_name}</strong>
            </Text>
            <Button
              colorScheme="blue"
              variant="outline"
              bg="white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </HStack>
        </Box>
      )}
    </HStack>
  );
}
