import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  Image,
  Tag,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import url from "../constant";
import ImageBox from "./utils/ImageBox";
import Loader from "./utils/Loader";
import { ChevronRightIcon } from "@chakra-ui/icons";
import ItemCard from "./ItemCard";
import { UserContext } from "../Context/ContextAPI";

const Book = () => {
  let { bookId } = useParams();
  const [book, setBook] = useState([]);
  const [selectedBox, setSelectedBox] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [similarBooksLoading, setSimilarBooksLoading] = useState(false);
  const { user, setUser, cart, setCart } = useContext(UserContext);
  const navigation = useNavigate();

  const getBook = async (bookId) => {
    try {
      setLoading(true);
      let { data } = await axios.post(`${url}/getSingleBook`, { bookId });
      setBook(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(bookId);
    getBook(bookId);
  }, [bookId]);

  const getSimilarBooks = async (year, currId) => {
    setSimilarBooksLoading(true);
    try {
      let { data } = await axios.post(`${url}/getSimilarBooks`, {
        year,
        currId,
      });
      setSimilarBooks(data);
    } catch (e) {
      console.log(e);
    } finally {
      setSimilarBooksLoading(false);
    }
  };

  useEffect(() => {
    try {
      let { year } = book;

      year !== undefined && getSimilarBooks(year, book._id);
    } catch (e) {
      console.log(e);
    }
  }, [book]);

  const [pincode, setPincode] = useState("");

  const toast = useToast();

  const checkDelivery = async () => {
    setDeliveryAvailable(null);
    setPincodeLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const district = data[0].PostOffice[0].District;
      if (district === "Pune") {
        setDeliveryAvailable(true);
      } else {
        setDeliveryAvailable(false);
      }
    } catch (e) {
      console.log("Pincode Error");
      toast({
        title: "Please enter a valid pincode",
        duration: 2000,
        status: "error",
      });
      console.log(e);
    } finally {
      setPincodeLoading(false);
    }
  };

  let regex = /^[a-zA-Z]+$/;

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const addToCart = async () => {
    console.log(book);
    try {
      let data = await axios.post(
        `${url}/addToCart`,
        { book },
        { withCredentials: true }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <Box
        w={"100vw"}
        h={"100vh"}
        bgColor={"#f5ffff"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      pl={"3rem"}
      pr={"3rem"}
      pt={"7rem"}
      bgColor={"#f5ffff"}
      fontFamily={"Poppins"}
    >
      {loading && (
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          mt={"8rem"}
        >
          <Loader />
        </Box>
      )}
      {!loading && (
        <HStack w={"100%"} h={"100%"} gap={"1.5rem"} alignItems={"flex-start"}>
          {/* Left side */}

          <Box w={"40%"} h={"100%"}>
            <HStack w={"100%"} h={"100%"} gap={0} alignItems={"flex-start"}>
              {/* sub stack left side */}

              <Box w={"20%"} h={"100%"} display={"flex"} flexDir={"column"}>
                {book?.image?.map((e, index) => {
                  return (
                    <ImageBox
                      img={e}
                      key={index}
                      ind={index}
                      selectedBox={selectedBox}
                      setSelectedBox={setSelectedBox}
                    />
                  );
                })}
              </Box>

              {/* sub stack right side */}
              <Box w={"80%"} h={"27rem"} border={"0.1px solid #e8e8e8"}>
                {book && book.image && book.image[0] && (
                  <Image
                    w={"100%"}
                    h={"100%"}
                    src={book?.image[selectedBox]}
                    objectFit={"cover"}
                  />
                )}
              </Box>
            </HStack>
          </Box>
          {/* Right side */}
          <Box w={"60%"} h={"100%"}>
            {/* Breadcrumb */}
            <Box fontSize={"0.9rem"} color={"#888"}>
              <Breadcrumb
                spacing="8px"
                separator={<ChevronRightIcon color="gray.500" />}
              >
                <BreadcrumbItem _hover={{ color: "#fb635d" }}>
                  <NavLink to={"/"}>Home</NavLink>
                </BreadcrumbItem>

                <BreadcrumbItem _hover={{ color: "#fb635d" }}>
                  <NavLink to={"/buy-book"}>Books</NavLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage _hover={{ color: "#fb635d" }}>
                  <NavLink>
                    {book?.name?.length > 15
                      ? book?.name.slice(0, 15) + " ..."
                      : book?.name}
                  </NavLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            {/* Free delivery */}
            {/* <Box
              mt={"1rem"}
              bgColor={"#fcd3d2"}
              display={"inline-block"}
              p={"0.5rem 2rem 0.5rem 2rem"}
              color={"#fb635d"}
              fontWeight={"700"}
              fontSize={"0.9rem"}
              border={"0.1px solid #fca39f"}
            >
              <Box>
                <Text>Free delivery for orders above Rs 999</Text>
              </Box>
            </Box> */}

            {/* Book Title */}
            <Box mt={"1rem"}>
              <Text fontSize={"1.6rem"}>{book?.name}</Text>
            </Box>
            {/* Book Price */}
            <Box
              mt={"0.5rem"}
              display={"flex"}
              alignItems={"baseline"}
              gap={"1rem"}
            >
              {/* Original price */}
              <Text fontSize={"1.6rem"} fontWeight={"600"}>
                ₹{book?.discountedPrice}
              </Text>
              {/* Discounted price */}
              {book?.discountedPrice !== book?.price && (
                <Text
                  fontSize={"1rem"}
                  color={"#878787"}
                  textDecoration={"line-through"}
                  fontWeight={"400"}
                >
                  ₹{book?.price}
                </Text>
              )}
              {/* Percent off */}
              {book?.discountedPrice !== book?.price && (
                <Text fontWeight={"600"} color={"#fb635d"}>
                  {Math.round(
                    ((book?.price - book?.discountedPrice) / book?.price) * 100
                  )}
                  % off
                </Text>
              )}
            </Box>

            {/* Book year and branch */}
            <Box mt={"1rem"} display={"flex"} gap={"1rem"}>
              {/* Book Year */}
              <Tag
                size={"md"}
                // variant="solid"
                // bgColor={"#fa827d"}
                cursor={"default"}
                transition={"0.4s all"}
              >
                {book?.year} Year
              </Tag>
              <Tag
                size={"md"}
                // variant="solid"
                // bgColor={"#fa827d"}
                cursor={"default"}
                transition={"0.4s all"}
              >
                {book?.branch} Engineering
              </Tag>
            </Box>

            {/* Buy Now Button */}
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box mt={"1.5rem"} fontSize={"1.1rem"}>
                <Button
                  display={"flex"}
                  alignItems={"center"}
                  gap={"0.5rem"}
                  bgColor={"#f5ffff"}
                  border={"1.5px solid #fb635d"}
                  color={"#fb635d"}
                  pl={"1.5rem"}
                  pr={"1.5rem"}
                  pt={"1.4rem"}
                  pb={"1.4rem"}
                  _hover={{
                    bgColor: "#fff",
                  }}
                  onClick={() => {
                    addToCart();
                    if (cart?.includes(book._id)) {
                      let newCart = cart.filter((b) => {
                        return b !== book._id;
                      });
                      setCart(newCart);
                    } else {
                      setCart((prevVal) => {
                        return [...prevVal, book._id];
                      });
                    }
                  }}
                >
                  <Text fontSize={"0.9rem"}>
                    {cart?.includes(book._id) ? (
                      <i class="fa-solid fa-check"></i>
                    ) : (
                      <i class="fa-solid fa-cart-shopping"></i>
                    )}
                  </Text>
                  <Text>
                    {cart?.includes(book._id) ? "Added to cart" : "Add to cart"}
                  </Text>
                </Button>
              </Box>
              <Box mt={"1.5rem"} fontSize={"1.1rem"}>
                <Button
                  display={"flex"}
                  alignItems={"center"}
                  gap={"0.5rem"}
                  bgColor={"#fb635d"}
                  color={"#f5f5f5"}
                  pl={"2rem"}
                  pr={"2rem"}
                  pt={"1.4rem"}
                  pb={"1.4rem"}
                  isLoading={addToCartLoading}
                  _hover={{
                    bgColor: "#fa4d4d",
                  }}
                  onClick={async () => {
                    setAddToCartLoading(true);
                    await addToCart();
                    setAddToCartLoading(false);

                    setCart((prevVal) => {
                      return [...prevVal, book];
                    });
                    navigation("/cart");
                  }}
                >
                  <Text fontSize={"0.9rem"}>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </Text>
                  <Text>Buy Now</Text>
                </Button>
              </Box>
            </Box>
            {/* Check Delivery */}
            <Box mt={"2.5rem"}>
              {/* Check delivery title */}
              <Box fontSize={"1.2rem"} fontWeight={"600"}>
                <Text>Check Delivery</Text>
              </Box>
              {/* Check pincode */}
              <Box w={"40%"} mt={"0.7rem"}>
                <InputGroup>
                  <Input
                    placeholder="Enter Pincode"
                    border={"1px solid #aaa"}
                    _focusVisible={{ border: "1px solid #777" }}
                    _hover={{ border: "1px solid #777" }}
                    value={pincode}
                    maxLength={6}
                    type="text"
                    onChange={(e) => {
                      if (regex.test(e.target.value)) {
                        return;
                      }
                      setPincode(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      mr={"0.5rem"}
                      bgColor={"transparent"}
                      color={"#fb635d"}
                      _hover={{
                        bgColor: "transparent",
                        color: "#fa4d4d",
                      }}
                      onClick={checkDelivery}
                      isLoading={pincodeLoading}
                    >
                      Check
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            {/* Delivery available status */}
            {deliveryAvailable && (
              <Box
                display={"flex"}
                gap={"0.3rem"}
                alignItems={"center"}
                color={"#34BA43"}
                mt={"0.4rem"}
              >
                <Text fontSize={"0.8rem"}>Delivery available</Text>
                <Text fontSize={"0.8rem"}>
                  <i class="fa-regular fa-circle-check"></i>
                </Text>
              </Box>
            )}
            {/* Delivery not available status */}
            {deliveryAvailable === false && (
              <Box
                display={"flex"}
                gap={"0.3rem"}
                alignItems={"center"}
                color={"#fc5151"}
                mt={"0.4rem"}
              >
                <Text fontSize={"0.8rem"}>Sorry, delivery not available</Text>
                <Text fontSize={"0.8rem"}>
                  <i class="fa-regular fa-circle-xmark"></i>
                </Text>
              </Box>
            )}
          </Box>
        </HStack>
      )}
      {/* Similar Books */}
      {similarBooks && (
        <Box w={"100%"} bgColor={"#e3e3e3"} h={"1px"} mt={"1rem"}></Box>
      )}
      {similarBooks && (
        <Box>
          <Text fontSize={"1.4rem"} mt={"1rem"}>
            Recommendations for you
          </Text>
        </Box>
      )}
      {similarBooks && (
        <Box
          pt={"1rem"}
          bgColor={"#f5ffff"}
          display={"flex"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"2.5rem"}
          pb={"2rem"}
        >
          {similarBooks.map((book) => {
            return (
              <ItemCard
                bookName={book.name}
                bookPrice={book.price}
                bookDPrice={book.discountedPrice}
                bookImg={book.image}
                bookId={book._id}
                key={book._id}
                bookYear={book.year}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Book;
