import { greet } from "./utils/greet";
import { Container } from "@chakra-ui/react";

function App(): JSX.Element {
  return (
    <Container maxW="container.xl">
      <h1>{greet("World")}</h1>
    </Container>
  );
}

export default App;
