import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@chakra-ui/react";
import UserContextWrapper from "./components/UserContextWrapper";

export default function App(): JSX.Element {
  return (
    <Container maxW="container.xl">
      <UserContextWrapper>
        <Header />
        <Outlet />
      </UserContextWrapper>
    </Container>
  );
}
