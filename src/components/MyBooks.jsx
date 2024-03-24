import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";

const MyBooks = () => {
  const [myBooksArr, setMyBooksArr] = useState([]);

  useEffect(() => {
    const getMyBooks = async () => {
      try {
        console.log("Called");
        const { data } = await axios.get("/getMyBooks");
        setMyBooksArr(data);
      } catch (e) {
        console.log(e);
      }
    };

    getMyBooks();
  }, []);

  console.log(myBooksArr);
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
        <Text>My Books</Text>
      </Box>
      <Box
        w={"100%"}
        mt={"3rem"}
        display={"flex"}
        gap={"2rem"}
        flexWrap={"wrap"}
      >
        {myBooksArr.map((book) => {
          return (
            <ItemCard
              bookName={book.name}
              bookPrice={book.price}
              bookDPrice={book.discountedPrice}
              bookImg={book.image}
              bookId={book._id}
              wishlistArr={myBooksArr}
              key={book._id}
              //   liked={true} // bcoz wishlisted things are always liked.
              hideLike={true}
            />
          );
        })}
      </Box>
      {/* Padding bottom was not working, so I used an empty box with height 2rem at the bottom. */}
      <Box height={"2rem"}></Box>
    </Box>
  );
};

export default MyBooks;
