import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";

const BookCard = ({ name, price, img }) => {
  return (
    <Box
      mt={"0.1rem"}
      w={"13rem"}
      h={"18rem"}
      borderRadius={"0.3rem"}
      overflow={"hidden"}
      boxShadow={"0 0 1.5px #999"}
      mb={"0.1rem"}
    >
      <Box
        w={"100%"}
        h={"60%"}
        textAlign={"center"}
        overflow={"hidden"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Image src={img} alt={name} objectFit={"cover"} w={"100%"} h={"100%"} />
      </Box>
      <Box mt={"0.5rem"}>
        <Box ml={"1rem"}>
          <Text fontSize={"1.1rem"}>{name}</Text>
        </Box>
        <Box ml={"1rem"} mt={"0.3rem"}>
          <Text fontSize={"1.2rem"}>₹ {price}</Text>
        </Box>
        <Box mr={"1rem"} textAlign={"right"} >
          <Button size={"sm"} colorScheme="blue">
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
