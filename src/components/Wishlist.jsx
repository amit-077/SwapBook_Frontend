import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import url from "../constant";

const Wishlist = () => {
  const [wishlistArr, setWishlistArr] = useState([]);

  useEffect(() => {
    const getWishlistBooks = async () => {
      const data = await axios.post(`${url}/getWishlist`, { populate: true });
      setWishlistArr(data.data.wishlist);
    };

    getWishlistBooks();
  }, []);

  console.log(wishlistArr);
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      bgColor={"#f5ffff"}
      fontFamily={"Poppins"}
      color={"#333"}
      mt={"6rem"}
      pl={"6.5rem"}
      pr={"4rem"}
      pt={"1rem"}
    >
      <Box
        fontSize={"2rem"}
        mt={"1rem"}
        fontWeight={"600"}
        position={"relative"}
        _before={{
          content: `""`,
          height: "5%",
          width: "13%",
          position: "absolute",
          left: -3,
          bottom: -1,
          bgColor: "#FB635D",
        }}
      >
        <Text>My Wishlist</Text>
      </Box>
      <Box
        w={"100%"}
        mt={"3rem"}
        display={"flex"}
        gap={"2rem"}
        flexWrap={"wrap"}
      >
        {wishlistArr.map((book) => {
          return (
            <ItemCard
              bookName={book.name}
              bookPrice={book.price}
              bookDPrice={book.discountedPrice}
              bookImg={book.image}
              bookId={book._id}
              wishlistArr={wishlistArr}
              key={book._id}
              liked={true} // bcoz wishlisted things are always liked.
            />
          );
        })}
      </Box>
      {/* Padding bottom was not working, so I used an empty box with height 2rem at the bottom. */}
      <Box height={"2rem"}></Box>
    </Box>
  );
};

export default Wishlist;
