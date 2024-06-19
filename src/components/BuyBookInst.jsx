import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const BuyBookInst = ({ buy }) => {
  return (
    <Box
      w={"100%"}
      textAlign={"center"}
      pt={"2.5rem"}
      pl={{ lg: "7rem", md: "4rem", base: "1rem" }}
      pr={{ lg: "7rem", md: "4rem", base: "1rem" }}
      bgColor={buy ? "#f5ffff" : "#f5ffff"}
      pb={"5rem"}
    >
      <Box w={"100%"}>
        {buy ? (
          <Text
            fontWeight={"650"}
            fontSize={"1.7rem"}
            position={"relative"}
            width={"auto"}
            _before={{
              content: `""`,
              position: "absolute",
              width: "55%",
              height: "100%",
              borderBottom: "1px solid #0a66c2",
              paddingTop: "0.2rem",
            }}
          >
            How to{" "}
            <Text
              display={"inline-block"}
              color={"#fb635d"}
              fontWeight={"bold"}
            >
              BUY
            </Text>{" "}
            old books online on SwapBook?
          </Text>
        ) : (
          <Text
            fontWeight={"650"}
            fontSize={"1.7rem"}
            position={"relative"}
            width={"auto"}
            _before={{
              content: `""`,
              position: "absolute",
              width: "62%",
              height: "100%",
              borderBottom: "1px solid #0a66c2",
              paddingTop: "0.2rem",
            }}
          >
            How to{" "}
            <Text
              display={"inline-block"}
              color={"#fb635d"}
              fontWeight={"bold"}
            >
              SELL
            </Text>{" "}
            your old books online on SwapBook?
          </Text>
        )}
      </Box>
      <Box mt={"1.5rem"}>
        <Text
          color={"#555"}
          fontSize={{ lg: "1.15rem", md: "4rem", base: "0.9rem" }}
        >
          Unlock the value in your old books with ease and turn them into cash
          on BookSwap.
        </Text>
      </Box>
      {/* Boxes */}
      <Box
        mt={"3rem"}
        display={"flex"}
        gap={{ lg: "0", md: "1rem", base: "2rem" }}
        flexWrap={{ base: "wrap", md: "wrap", lg: "no-wrap" }}
        justifyContent={{ lg: "space-between", md: "center", base: "center" }}
        position={"relative"}
      >
        {/* left arrow */}
        <Box
          display={{ lg: "block", md: "none", base: "none" }}
          position={"absolute"}
          left={"16.8rem"}
          top={"9rem"}
          zIndex={5}
          transform={"scale(0.95)"}
        >
          <Image src="/images/arrow.png" />
        </Box>
        {/* right arrow */}
        <Box
          display={{ lg: "block", md: "none", base: "none" }}
          position={"absolute"}
          left={"41.4rem"}
          top={"6rem"}
          zIndex={5}
          transform={"scale(0.95) scaleY(-1)"}
        >
          <Image src="/images/arrow.png" />
        </Box>
        {/* first box */}
        <Box
          w={"17rem"}
          h={"23rem"}
          bgColor={buy ? "#f5ffff" : "#f5ffff"}
          borderRadius={"0.4rem"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          position={"relative"}
          fontSize={"0.9rem"}
          _before={{
            content: `"Step 1"`,
            position: "absolute",
            bgColor: "#fb635d",
            color: "#f5f5f5",
            padding: "0.7rem 0.5rem 0.7rem 0.5rem",
            top: "-0.3rem",
            right: "0.5rem",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
          boxShadow={"0 0 10px #dadada"}
        >
          <Box
            transform={"scale(0.5)"}
            mt={"-3rem"}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Image
              src={!buy ? "/images/sellBook_1.png" : "/images/search.png"}
              bgColor={"#E4F1FF"}
              p={"2rem"}
              borderRadius={"2rem"}
            />
          </Box>
          <Box mt={"-2rem"} mb={"1rem"}>
            <Text
              fontSize={"1.2rem"}
              fontWeight={"500"}
              color={buy ? "#5b5b5b" : "#5b5b5b"}
            >
              {buy ? "Explore Available Books" : "List Your Books"}
            </Text>
          </Box>
          <hr></hr>
          <Box pl={"1.5rem"} pr={"1.5rem"} mt={"1rem"}>
            <Text fontSize={"1.1rem"} color={buy ? "#5b5b5b" : "#5b5b5b"}>
              {buy
                ? "Begin with our user-friendly search feature to find the books you want. Search by title or subject to narrow down your choices."
                : "Simply log in to your account, click on 'Sell Your Books,' and enter essential details about the book you want to sell."}
            </Text>
          </Box>
        </Box>
        {/* Second Box */}
        <Box
          w={"17rem"}
          h={"23rem"}
          bgColor={buy ? "#f5ffff" : "#f5ffff"}
          borderRadius={"0.4rem"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          position={"relative"}
          fontSize={"0.9rem"}
          _before={{
            content: `"Step 2"`,
            position: "absolute",
            bgColor: "#fb635d",
            color: "#f5f5f5",
            padding: "0.7rem 0.5rem 0.7rem 0.5rem",
            top: "-0.3rem",
            right: "0.5rem",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
          boxShadow={"0 0 10px #dadada"}
        >
          <Box
            transform={"scale(0.5)"}
            mt={"-3rem"}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Image
              src={!buy ? "/images/set-price.png" : "/images/meeting.png"}
              bgColor={"#E4F1FF"}
              p={"2rem"}
              borderRadius={"2rem"}
            />
          </Box>
          <Box mt={"-2rem"} mb={"1rem"}>
            <Text
              fontSize={"1.2rem"}
              fontWeight={"500"}
              color={buy ? "#5b5b5b" : "#5b5b5b"}
            >
              {buy ? "Connect with Sellers" : "Set the Price"}
            </Text>
          </Box>
          <hr></hr>
          <Box pl={"1.5rem"} pr={"1.5rem"} mt={"1rem"}>
            <Text fontSize={"1.1rem"} color={buy ? "#5b5b5b" : "#5b5b5b"}>
              {buy
                ? "To purchase a book, click on the listing, where you can access more information and message to the seller through our platform."
                : "Once your books are listed, it's time to set a fair price. Consider the book's condition, its market value, and any additional materials."}
            </Text>
          </Box>
        </Box>
        {/* Third Box */}
        <Box
          w={"17rem"}
          h={"23rem"}
          bgColor={buy ? "#f5ffff" : "#f5ffff"}
          borderRadius={"0.4rem"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          position={"relative"}
          fontSize={"0.9rem"}
          _before={{
            content: `"Step 3"`,
            position: "absolute",
            bgColor: "#fb635d",
            color: "#f5f5f5",
            padding: "0.7rem 0.5rem 0.7rem 0.5rem",
            top: "-0.3rem",
            right: "0.5rem",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
          boxShadow={"0 0 10px #dadada"}
        >
          <Box
            transform={"scale(0.5)"}
            mt={"-3rem"}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Image
              src={!buy ? "/images/partner.png" : "/images/exchange.png"}
              bgColor={"#E4F1FF"}
              p={"2rem"}
              borderRadius={"2rem"}
            />
          </Box>
          <Box mt={"-2rem"} mb={"1rem"}>
            <Text
              fontSize={"1.2rem"}
              fontWeight={"500"}
              color={buy ? "#5b5b5b" : "#5b5b5b"}
            >
              {buy ? "Finalize the Purchase" : "Connect with Buyers"}
            </Text>
          </Box>
          <hr></hr>
          <Box pl={"1.5rem"} pr={"1.5rem"} mt={"1rem"}>
            <Text fontSize={"1.1rem"} color={buy ? "#5b5b5b" : "#5b5b5b"}>
              {buy
                ? "Once you and the seller agree, finalize the purchase by arranging a convenient meet-up on campus or selecting a delivery method."
                : "Sit back and relax as interested buyers discover your listings. They can view your book's details, and contact you directly."}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyBookInst;
