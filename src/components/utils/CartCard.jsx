import { Box, Button, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import url from "../../constant";

const CartCard = ({ item, updateCart, setUpdateCart }) => {
  const removeFromCart = async () => {
    try {
      let data = await axios.post(
        `${url}/addToCart`,
        { book: item },
        { withCredentials: true }
      );
      if (data.status === 200) {
        setUpdateCart((prevVal) => {
          return !prevVal;
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Box w={"100%"} h={"1px"} bgColor={"#f4f4f4"} mb={"1rem"}></Box>
      <Box display={"flex"} alignItems={"flex-start"} gap={"1rem"} w={"100%"}>
        {/* bookimage */}
        <Box>
          <Image
            src={item?.image[0]}
            w={"9rem"}
            h={"11rem"}
            objectFit={"contain"}
          />
        </Box>
        {/* book text */}
        <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
          <Box fontSize={"1.3rem"} color={"#000"}>
            <Text>{item?.name}</Text>
          </Box>
          <Box fontSize={"1rem"} color={"#454545"}>
            <Text>Year : {item?.year} Year</Text>
          </Box>
          <Box fontSize={"1rem"} color={"#454545"}>
            <Text>Branch : {item?.branch}</Text>
          </Box>
          <Box fontSize={"1rem"} color={"#454545"}>
            <Text>Price : ₹{item?.discountedPrice}</Text>
          </Box>
          <Box display={"flex"} w={"100%"}>
            <Button
              colorScheme="red"
              w={"100%"}
              size={"sm"}
              onClick={removeFromCart}
            >
              Remove from cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
