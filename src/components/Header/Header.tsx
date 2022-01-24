import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";

import { UserContext } from "../../contexts/UserContext";
import { IUser } from "../../utils/interfaces";

export default function Header(): JSX.Element {
  const { userData, setUserData } = useContext(UserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setselectedUser] = useState<number | undefined>(
    undefined
  );
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  useEffect(() => {
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
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginCancel = () => {
    setShowLoginForm(false);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setUserData(
      users ? users.find((user) => selectedUser === user.id) : undefined
    );
    setShowLoginForm(false);
  };

  const handleLogout = () => {
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
      <Box>
        <Heading as="h1" size="xl">
          Project Tracker
        </Heading>
      </Box>

      {!showLoginForm && !userData && (
        <Box>
          <Button
            colorScheme="blue"
            variant="outline"
            bg="white"
            onClick={handleLoginClick}
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
                    onChange={(e) => setselectedUser(Number(e.target.value))}
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
