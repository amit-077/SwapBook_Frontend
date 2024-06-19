import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import url from "../constant";
import Loader from "./utils/Loader";
import CartCard from "./utils/CartCard";

const MyOrders = () => {
  const [wishlistArr, setWishlistArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const [updateCart, setUpdateCart] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        let { data } = await axios.get(`${url}/getOrders`);
        console.log(data);
        setOrders(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
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
        <Text>My Orders</Text>
      </Box>
      <Box
        w={"100%"}
        mt={"3rem"}
        display={"flex"}
        gap={"2rem"}
        flexWrap={"wrap"}
      >
        {loading && (
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"center"}
            mt={"5rem"}
          >
            <Loader />
          </Box>
        )}
        {/* {!loading &&
          wishlistArr.map((book) => {
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
          })} */}
        <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
          {orders.map((item, index) => {
            return (
              <Box
                display={"flex"}
                gap={"1rem"}
                bgColor={"#fff"}
                boxShadow={"0 0 1px #888"}
                borderRadius={"0.5rem"}
                p={"1rem 3rem 1rem 3rem"}
              >
                <Box>
                  <Image
                    src={item.orders[0].image[0]}
                    w={"13rem"}
                    h={"13rem"}
                  />
                </Box>
                <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
                  <Text>Book Name : {item.orders[0]?.name}</Text>
                  <Text>Book Price : {item.orders[0]?.price}</Text>
                  <Text>Year : {item.orders[0]?.year}</Text>
                  <Text>Branch : {item.orders[0]?.branch}</Text>
                  <Text>Payment Method : {item?.payment}</Text>
                  <Text>Order Date : {today}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* Padding bottom was not working, so I used an empty box with height 2rem at the bottom. */}
      <Box height={"2rem"}></Box>
    </Box>
  );
};

export default MyOrders;
