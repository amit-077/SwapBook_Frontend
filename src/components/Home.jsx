import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookCard from "./BookCard";
import BuyBookInst from "./BuyBookInst";
import { Parallax } from "react-parallax";
import { Link, NavLink } from "react-router-dom";

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
  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      overflowX={"hidden"}
      fontFamily={"Poppins"}
      bgColor={"#f5ffff"}
    >
      <Box w={"100%"} position={"relative"} mt={"5rem"}>
        <Box>
          <HStack w={"100%"} justifyContent={"left"}>
            {/* Text */}
            <VStack w={"60%"} pl={"6.3rem"}>
              <Box w={"100%"} pr={"5rem"}>
                <Box>
                  <Text
                    fontSize={"3.5rem"}
                    fontWeight={"600"}
                    display={"inline-block"}
                  >
                    Buy and sell your college books for the best{" "}
                    <Text display={"inline-block"} color={"#fb635d"}>
                      price.
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
                  <Box display={"flex"} gap={"5rem"}>
                    <Button
                      bgColor={"#fb635d"}
                      p={"1.5rem 1.8rem 1.5rem 1.8rem"}
                      borderRadius={"2rem"}
                      color={"#f5ffff"}
                      _hover={{
                        bgColor: "#ff504a",
                      }}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                      &nbsp;&nbsp;Search Book
                    </Button>

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
            <VStack w={"40%"}>
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
          <Box w={"100%"} mt={"2rem"} mb={"2rem"}>
            <Text>Newly Added Books</Text>
          </Box>
          {/* Newly added Books */}
          <Box>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              transitionDuration={1000}
              arrows={false}
            >
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
            </Carousel>
          </Box>
          {/* Below Section */}
        </Box>
      </Box>
      <Box
        w={"100%"}
        bgColor={"#fb635d"}
        mt={"4rem"}
        pt={"2rem"}
        pb={"2rem"}
        pl={"10rem"}
        color={"#f5ffff"}
      >
        <Box>
          <Text fontSize={"1.5rem"} fontWeight={"600"} color={"#f5ffff"}>
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

        <Box display={"flex"} gap={"1rem"} alignItems={"center"} mt={"2rem"}>
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
        h={"10rem"}
        bgColor={"#F5F8FA"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Text fontSize={"3rem"}>Footer</Text>
      </Box>
    </Box>
  );
};

export default Home;
