import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const BookCard = () => {
  return (
    <Box
      w={"13rem"}
      h={"16rem"}
      borderRadius={"0.3rem"}
      bgColor={"red"}
      overflow={"hidden"}
    >
      <Box w={"100%"} h={"50%"} bgColor={"blue"} textAlign={"center"}></Box>
      <Box mt={"0.5rem"}>
        <Box ml={"1rem"}>
          <Text fontSize={"1.1rem"}>Book name here</Text>
        </Box>
        <Box ml={"1rem"} mt={"0.3rem"}>
          <Text fontSize={"1.2rem"}>₹999</Text>
        </Box>
        <Box mr={"1rem"} mt={"0.8rem"} textAlign={"right"}>
          <Button size={"sm"} colorScheme="blue">
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
