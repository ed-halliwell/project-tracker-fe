import { Box, Button, VStack } from "@chakra-ui/react";
import "../styles/HomePage.css";

export default function HomePage(): JSX.Element {
  return (
    <Box w="100%" h="100vh" className="hero">
      <VStack spacing={10}>
        <h2 className="hero-text">Get your team organised</h2>
        <Button variant="solid" colorScheme="blue" size="lg">
          Get started
        </Button>
      </VStack>
    </Box>
  );
}
