import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookCard from "./BookCard";
import BuyBookInst from "./BuyBookInst";
import { Parallax } from "react-parallax";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import url from "../constant";
import { UserContext } from "../Context/ContextAPI";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const { books, setBooks, setBackupBooks } = useContext(UserContext);

  const getAllBooks = async () => {
    try {
      let { data } = await axios.get(`${url}/getNearestBooks`, {
        withCredentials: true,
      });
      console.log(data);
      setBooks(data);
      setBackupBooks(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      overflowX={"hidden"}
      fontFamily={"Poppins"}
      bgColor={"#f5ffff"}
    >
      <Box
        w={"100%"}
        position={"relative"}
        mt={{ base: "8rem", md: "3rem", lg: "5rem" }}
      >
        <Box>
          <HStack w={"100%"} justifyContent={"left"}>
            {/* Text */}
            <VStack
              w={{ base: "100%", md: "100%", lg: "60%" }}
              pl={{ base: "1rem", md: "3rem", lg: "6.3rem" }}
            >
              <Box w={"100%"} pr={{ base: "2rem", md: "3rem", lg: "5rem" }}>
                <Box>
                  <Text
                    fontSize={{ base: "2.5rem", md: "0", lg: "3rem" }}
                    fontWeight={"600"}
                    display={"inline-block"}
                  >
                    Buy and sell your college books for the best{" "}
                    <Text display={"inline-block"} color={"#fb635d"}>
                      price
                    </Text>
                  </Text>
                </Box>
                <Box mt={"1.5rem"}>
                  <Text fontWeight={"500"} color={"#808585"}>
                    Discover the ease of SwapBook for buying and selling
                    second-hand books online, ensuring the best prices for your
                    used books.
                  </Text>
                </Box>
                <Box mt={"2rem"}>
                  <Box
                    display={"flex"}
                    gap={{ lg: "5rem", md: "3rem", base: "1rem" }}
                  >
                    <NavLink to={"/buy-book"}>
                      <Button
                        bgColor={"#fb635d"}
                        p={{
                          lg: "1.5rem 1.8rem 1.5rem 1.8rem",
                          md: "1.5rem 1.8rem 1.5rem 1.8rem",
                          base: "1rem 1.5rem 1rem 1.5rem",
                        }}
                        fontSize={{ lg: "1rem", md: "0.8rem", base: "0.7rem" }}
                        borderRadius={"2rem"}
                        color={"#f5ffff"}
                        _hover={{
                          bgColor: "#ff504a",
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        &nbsp;&nbsp;Search Book
                      </Button>
                    </NavLink>

                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.3rem"}
                      cursor={"pointer"}
                      onClick={() => {
                        document
                          .getElementById("sellOldBooks")
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                      fontSize={{ lg: "1rem", md: "0.8rem", base: "0.8rem" }}
                    >
                      <Text
                        color={"#fb635d"}
                        bgColor={"#f6eeee"}
                        p={"0.5rem 1rem 0.5rem 1rem"}
                        borderRadius={"100%"}
                        transform={"scale(0.9)"}
                      >
                        <i className="fa-solid fa-play"></i>
                      </Text>
                      <Text fontWeight={"600"}>How it works</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </VStack>
            {/* Image */}
            <VStack
              w={"40%"}
              display={{ lg: "block", md: "none", base: "none" }}
            >
              <Box position={"relative"}>
                <Box
                  position={"relative"}
                  bgColor={"#c5dcfc"}
                  transform={"scale(0.68)"}
                  borderTopRightRadius={"5rem"}
                  borderBottomLeftRadius={"5rem"}
                  overflow={"hidden"}
                >
                  <Image
                    transform={"scale(1.05)"}
                    position={"relative"}
                    bottom={"-1.6rem"}
                    src="/images/Books.png"
                  />
                </Box>
                <Box
                  position={"absolute"}
                  transform={"scale(0.45)"}
                  top={"7rem"}
                  left={"-7rem"}
                  bgColor={"#c5dcfc"}
                  p={"1rem"}
                  borderTopRightRadius={"3rem"}
                  borderBottomLeftRadius={"3rem"}
                  overflow={"hidden"}
                  outline={"1.1rem solid #f5ffff"}
                >
                  <Image src="/images/book-stack.png" />
                </Box>
              </Box>
            </VStack>
          </HStack>
        </Box>

        <Box w={"100%"} pl={"5rem"} pr={"5rem"}>
          <Box
            w={"100%"}
            mt={"2rem"}
            mb={"2rem"}
            display={{ lg: "block", md: "none", base: "none" }}
          >
            <Text fontSize={"1.1rem"} fontWeight={"400"} color={"#808585"}>
              Newly Added Books
            </Text>
          </Box>
          {/* Newly added Books */}
          <Box display={{ lg: "block", md: "none", base: "none" }}>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              transitionDuration={1000}
              arrows={false}
            >
              {books.slice(0, 10).map((e) => {
                return (
                  <BookCard name={e.name} price={e.price} img={e.image[0]} />
                );
              })}
            </Carousel>
          </Box>
          {/* Below Section */}
        </Box>
      </Box>
      <Box
        w={"100%"}
        bgColor={"#fb635d"}
        mt={"4rem"}
        pt={"3rem"}
        pb={"3rem"}
        pl={{ lg: "6rem", md: "4rem", base: "2rem" }}
        color={"#f5ffff"}
      >
        <Box>
          <Text
            fontSize={{ lg: "1.5rem", md: "1.3rem", base: "1rem" }}
            fontWeight={"600"}
            color={"#f5ffff"}
          >
            Do you have a pile of secondhand college books that could be of
            great help to your juniors?
          </Text>
        </Box>
        <Box>
          <Text mt={"0.7rem"} fontSize={"1.17rem"}>
            Why not turn your old college books into cash while aiding your
            fellow juniors?
          </Text>
        </Box>

        <Box
          display={"flex"}
          gap={"1rem"}
          alignItems={{ lg: "center", md: "left", base: "left" }}
          mt={"2rem"}
          flexDir={{ lg: "row", md: "column", base: "column" }}
        >
          <Text fontSize={"1.2rem"} fontWeight={"400"} id="sellOldBooks">
            "Unlock the value of your secondhand college books – sell them and
            assist other students!"
          </Text>
          <NavLink to={"/sell-book"}>
            <Button colorScheme="blue">Sell Now!</Button>
          </NavLink>
        </Box>
      </Box>
      {/* Sell and buy instructions */}
      <BuyBookInst />
      <BuyBookInst buy={true} />
      <Box
        w={"100%"}
        h={"12rem"}
        bgColor={"#F5F8FA"}
        display={"flex"}
        justifyContent={"center"}
      >
        {/* Footer */}
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
          pt={"1.5rem"}
          bgColor={"#333"}
          color={"#f5f5f5"}
          pb={"1.5rem"}
        >
          <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
            <Text
              fontWeight={"600"}
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
            >
              ABOUT US{" "}
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              mt={"0.3rem"}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              About us
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              Contact Us
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              Blog
            </Text>
          </Box>
          <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
            <Text
              fontWeight={"600"}
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
            >
              USEFUL LINKS
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              mt={"0.3rem"}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              How it works?
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              Clankart Teleport
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              Frequently Asked Questions (FAQs)
            </Text>
            <Text
              fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
              cursor={"pointer"}
              _hover={{
                color: "#fb635d",
              }}
            >
              Terms Of Use / Listing Policy / Privacy Policy
            </Text>
          </Box>
          <Box
            display={{ base: "none", md: "flex", lg: "flex" }}
            flexDir={"column"}
            gap={"0.5rem"}
            fontSize={{ lg: "0.9rem", md: "0.7rem", base: "0.7rem" }}
          >
            <Text fontWeight={"600"}>STAY CONNECTED</Text>
            <Box display={"flex"} gap={"1.5rem"} mt={"0.3rem"}>
              <Text
                fontSize={{ lg: "1.5rem", md: "0.7rem", base: "1rem" }}
                cursor={"pointer"}
                _hover={{ color: "#139CF7" }}
              >
                <i class="fa-brands fa-facebook"></i>
              </Text>
              <Text
                fontSize={{ lg: "1.5rem", md: "0.7rem", base: "1rem" }}
                cursor={"pointer"}
                _hover={{ color: "#E94B52" }}
              >
                <i class="fa-brands fa-instagram"></i>
              </Text>
              <Text
                fontSize={{ lg: "1.5rem", md: "0.7rem", base: "1rem" }}
                cursor={"pointer"}
                _hover={{ color: "#F60002" }}
              >
                <i class="fa-brands fa-youtube"></i>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
