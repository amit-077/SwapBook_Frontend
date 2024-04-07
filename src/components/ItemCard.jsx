import { Box, Button, Image, Link, Tag, Text, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/ContextAPI";
import url from "../constant";
import { NavLink } from "react-router-dom";

const ItemCard = ({
  bookName,
  bookPrice,
  bookDPrice,
  bookImg,
  bookId,
  wishlistArr,
  liked,
  hideLike,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (wishlistArr?.includes(bookId) || liked) {
      setIsWishlisted(true);
    }
  }, [wishlistArr]);

  const addToWishList = async () => {
    // Updates wishlist UI on frontend
    isWishlisted ? setIsWishlisted(false) : setIsWishlisted(true);
    // Updates wishlist array on backend
    try {
      const data = await axios.post(
        `${url}/wishlist`,
        { bookId },
        { withCredentials: true }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavLink to={`/book/${bookId}`}>
      <Box>
        <Box
          w={"15rem"}
          h={"25rem"}
          cursor={"pointer"}
          boxShadow={"0 0 4px #e5e5e5"}
          transition={"0.3s all"}
          _hover={{ boxShadow: "0 0 5px #d1d1d1" }}
          borderRadius={"0.2rem"}
          borderTopLeftRadius={"0.5rem"}
          borderTopRightRadius={"0.5rem"}
          overflow={"hidden"}
        >
          {/* Image */}
          <Box borderRadius={"0.5rem"} position={"relative"}>
            <Image
              src={bookImg[0]}
              w={"15rem"}
              h={"14rem"}
              objectFit={"cover"}
              borderRadius={"0.5rem 0.5rem 0 0"}
              id="bgImage"
              borderBottom={"1px solid #f1f1f1"}
              position={"relative"}
              loading="lazy"
              // onMouseOver={(e) => {
              //   e.target.src = bookImg[1] ? bookImg[1] : bookImg[0];
              // }}
              // onMouseOut={(e) => {
              //   e.target.src = bookImg[0];
              // }}
            />
            {!hideLike && (
              <Box
                position={"absolute"}
                top={"1rem"}
                right={"1rem"}
                bgColor={"#fff"}
                pl={"0.4rem"}
                pr={"0.4rem"}
                pt={"0.1rem"}
                pb={"0.1rem"}
                borderRadius={"100%"}
                onClick={addToWishList}
              >
                <Tooltip
                  label="Add to wishlist"
                  hasArrow
                  placement="left-end"
                  fontSize={"0.8rem"}
                  borderRadius={"0.2rem"}
                  openDelay={100}
                  pt={"0.3rem"}
                  pb={"0.3rem"}
                  pl={"0.7rem"}
                >
                  <Text
                    _hover={{ color: "#fb635d" }}
                    transition={"0.2s all"}
                    fontSize={"1.1rem"}
                    textAlign={"center"}
                    color={isWishlisted ? "#FB635D" : null}
                  >
                    {isWishlisted ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </Text>
                </Tooltip>
              </Box>
            )}
          </Box>
          {/* Details */}
          <Box p={"0.7rem 1rem 0.5rem 1rem"}>
            <Box>
              <Tooltip
                label={bookName}
                placement="top-start"
                fontSize={"0.7rem"}
                bgColor={"#444"}
                openDelay={100}
              >
                {/* Here below, I have added "Hello World", but there should be a permenant solution for that. Do something for that. */}
                <Text>
                  {bookName.length > 30 ? (
                    bookName.substring(0, 30) + "..."
                  ) : (
                    <>
                      {bookName}{" "}
                      <span style={{ visibility: "hidden" }}>
                        Hello world 123456789
                      </span>
                    </>
                  )}
                </Text>
              </Tooltip>
            </Box>
            <Box
              pt={"0.5rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} alignItems={"center"} gap={"0.6rem"}>
                <Text fontSize={"1.2rem"} fontWeight={"500"}>
                  {"₹" + (bookDPrice == 0 ? bookPrice : bookDPrice)}
                </Text>
                {bookDPrice != bookPrice && (
                  <Text fontSize={"0.8rem"} color={"grey"} fontWeight={"400"}>
                    <strike>{"₹" + bookPrice}</strike>
                  </Text>
                )}
              </Box>
              {bookDPrice != bookPrice && (
                <Box>
                  <Tag size={"sm"} variant="solid" bgColor="#E8FFF3">
                    <Text
                      fontSize={"0.68rem"}
                      color={"#26A541"}
                      fontWeight={"600"}
                      p={"0.3rem 0.2rem 0.3rem 0.2rem"}
                    >
                      {Math.round(100 - (bookDPrice * 100) / bookPrice) +
                        "% off"}
                    </Text>
                  </Tag>
                </Box>
              )}
            </Box>
            <Box
              mt={"1rem"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Tag variant={"solid"} size={"sm"} bgColor={"#EEF5FF"}>
                <Text
                  fontSize={"0.7rem"}
                  color={"#5FBDFF"}
                  fontWeight={"600"}
                  p={"0.3rem 0.2rem 0.3rem 0.2rem"}
                >
                  College Match
                </Text>
              </Tag>
              <Button
                size={"sm"}
                bgColor={"#FB635D"}
                color={"#f5f5f5"}
                fontSize={"0.8rem"}
                _hover={{ bgColor: "#F05941" }}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </NavLink>
  );
};

export default ItemCard;
