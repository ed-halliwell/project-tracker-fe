import { Box, Heading, VStack } from "@chakra-ui/react";
import "../styles/HomePage.css";

export default function HomePage(): JSX.Element {
  return (
    <Box w="100%" h="100vh" className="hero">
      <VStack spacing={10}>
        <h2 className="hero-text">Get your team organised</h2>
        <Heading className="small-hero">Login to get started!</Heading>
      </VStack>
    </Box>
  );
}
