import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import axios from "axios";
import Loader from "./utils/Loader";

const BuyBook = () => {
  const [sliderValue1, setSliderValue1] = useState(50);
  const [sliderValue2, setSliderValue2] = useState(5000);
  const [locationRange, setLocationRange] = useState(11);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [booksArr, setBooksArr] = useState([]);
  const [sort, setSort] = useState("");
  const [wishlistArr, setWishlistArr] = useState("");
  const [bookCond, setBookCond] = useState([]); // set book condition for filtering books with condition
  const [loading, setLoading] = useState(false);

  // Get all books for display
  // useEffect(() => {
  //   const getAllBooks = async () => {
  //     setLoading(true);
  //     try {
  //       let data = await axios.get("/getAllBooks");
  //       setBooksArr(data.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };

  //   getAllBooks();
  // }, []);

  // Get the current user to add wishlist books to his collection. Get updated user, not local storage wala user.
  // useEffect(() => {
  //   const getWishlistBooks = async () => {
  //     const data = await axios.post("/getWishlist", { populate: false });
  //     setWishlistArr(data.data.wishlist);
  //   };

  //   getWishlistBooks();
  // }, []);

  // UseEffect for handling debouncing / throttling

  useEffect(() => {
    let changeValue; // variable for clearing and setting timeout

    changeValue = setTimeout(() => {
      setPriceRange();
    }, 500);

    return () => {
      clearTimeout(changeValue);
    };
  }, [sliderValue1, sliderValue2]);

  document
    ?.getElementById("numericInput3")
    ?.addEventListener("wheel", function (event) {
      // Disable scrolling behavior when the input is focused
      if (document.activeElement === document.getElementById("numericInput3")) {
        event.preventDefault();
      }
    });

  document
    ?.getElementById("numericInput4")
    ?.addEventListener("wheel", function (event) {
      // Disable scrolling behavior when the input is focused
      if (document.activeElement === document.getElementById("numericInput4")) {
        event.preventDefault();
      }
    });

  const sortBooks = async (sort) => {
    const data = await axios.post("/sortBooks", { sortQuery: sort });
    setBooksArr(data.data);
  };

  const setPriceRange = async () => {
    setLoading(true);
    let data = await axios.post("/price", {
      low: sliderValue1,
      high: sliderValue2,
    });
    setBooksArr(data.data);
    setLoading(false);
  };

  useEffect(() => {
    const bookCondition = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/bookCondition", { bookCond });
        setBooksArr(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    bookCond.length > 0 && bookCondition();
  }, [bookCond]);

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      bgColor={"#f5ffff"}
      fontFamily={"Poppins"}
      color={"#333"}
      mt={"6rem"}
      pl={"3rem"}
      pr={"4rem"}
      pt={"1rem"}
    >
      <HStack w={"100%"} h={"100%"} spacing={"2rem"} position={"relative"}>
        <VStack
          w={"25%"}
          h={"auto"}
          border={"1px solid #E4E6EF"}
          pt={"1rem"}
          pb={"2rem"}
          borderRadius={"0.3rem"}
          position={"absolute"}
          top={0}
        >
          <Box w={"100%"}>
            {/* Price title */}
            <Box pl={"1.5rem"} pr={"1.5rem"}>
              <Text fontSize={"1.2rem"}>Price</Text>
            </Box>
            {/* Price range slider */}
            <Box mt={"1rem"} pl={"1.5rem"} pr={"1.5rem"} pb={"1rem"}>
              <RangeSlider
                defaultValue={[sliderValue1, sliderValue2]}
                value={[sliderValue1, sliderValue2]}
                min={50}
                max={5000}
                step={50}
                onChange={(e) => {
                  setSliderValue1(e[0]);
                  setSliderValue2(e[1]);
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <RangeSliderTrack bg="red.100">
                  <RangeSliderFilledTrack bg="#fb635d" />
                </RangeSliderTrack>
                <Tooltip
                  hasArrow
                  bg="#fb635d"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`₹${sliderValue1}`}
                >
                  <RangeSliderThumb
                    value={sliderValue1}
                    boxSize={5}
                    index={0}
                    border={"1px solid #d9d9d9"}
                  />
                </Tooltip>
                <Tooltip
                  hasArrow
                  bg="#fb635d"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`₹${sliderValue2}`}
                >
                  <RangeSliderThumb
                    boxSize={5}
                    index={1}
                    border={"1px solid #d9d9d9"}
                  />
                </Tooltip>
              </RangeSlider>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"0.7rem"}
                mt={"0.5rem"}
              >
                <Box>
                  <InputGroup>
                    <InputLeftAddon p={"0.5rem"}>₹</InputLeftAddon>
                    <Input
                      pl={"0.5rem"}
                      type="number"
                      id="numericInput3"
                      value={sliderValue1}
                      onChange={(e) => {
                        setSliderValue1(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <Text>to</Text>
                </Box>
                <Box>
                  <InputGroup>
                    <InputLeftAddon p={"0.5rem"}>₹</InputLeftAddon>
                    <Input
                      pl={"0.5rem"}
                      type="number"
                      id="numericInput4"
                      value={sliderValue2}
                      onChange={(e) => {
                        setSliderValue2(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
            {/* Divider */}
            <Menu>
              <MenuDivider />
            </Menu>
            {/* Filter by location */}

            {/* Location title */}
            <Box pl={"1.5rem"} pr={"1.5rem"}>
              <Text fontSize={"1.2rem"}>Filter by location</Text>
            </Box>

            {/* Location slider */}
            <Box mt={"1rem"} pl={"1.5rem"} pr={"1.5rem"} pb={"1rem"}>
              <Slider
                defaultValue={11}
                size={"lg"}
                step={"3"}
                min={5}
                max={50}
                onChange={(e) => {
                  setLocationRange(e);
                }}
                onMouseEnter={() => setShowTooltip1(true)}
                onMouseLeave={() => setShowTooltip1(false)}
              >
                <SliderTrack bg={"red.100"}>
                  <SliderFilledTrack bg="#fb635d" />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="#fb635d"
                  color="white"
                  placement="top"
                  isOpen={showTooltip1}
                  label={`${locationRange}km`}
                >
                  <SliderThumb boxSize={5} border={"1px solid #d9d9d9"} />
                </Tooltip>
              </Slider>
            </Box>
            {/* Divider */}
            <Menu>
              <MenuDivider />
            </Menu>
            {/* Book Condition */}
            <Accordion
              allowToggle
              defaultIndex={[0]}
              pl={"1.5rem"}
              pr={"1.5rem"}
              mt={"0.5rem"}
            >
              <AccordionItem border={"none"}>
                <AccordionButton
                  padding={"0"}
                  height={"1rem"}
                  mb={"1.5rem"}
                  _hover={{ bgColor: "" }}
                >
                  <Box mt={"2rem"}>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                      <Text fontSize={"1.2rem"}>Book Condition</Text>
                      <AccordionIcon />
                    </Box>
                  </Box>
                </AccordionButton>
                <AccordionPanel p={"0"} pt={"1rem"} pl={"0.5rem"}>
                  {/* items */}
                  <Box display={"flex"} flexDir={"column"} gap={"0.4rem"}>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"new"}
                        size={"lg"}
                        isChecked={bookCond.includes("new") ? true : false}
                        onChange={() => {
                          if (bookCond.includes("new")) {
                            setBookCond((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "new";
                              });
                            });
                          } else {
                            setBookCond((prevVal) => {
                              return [...prevVal, "new"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>New</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"excellent"}
                        size={"lg"}
                        isChecked={
                          bookCond.includes("excellent") ? true : false
                        }
                        onChange={() => {
                          if (bookCond.includes("excellent")) {
                            setBookCond((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "excellent";
                              });
                            });
                          } else {
                            setBookCond((prevVal) => {
                              return [...prevVal, "excellent"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Excellent</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"good"}
                        size={"lg"}
                        isChecked={bookCond.includes("good") ? true : false}
                        onChange={() => {
                          if (bookCond.includes("good")) {
                            setBookCond((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "good";
                              });
                            });
                          } else {
                            setBookCond((prevVal) => {
                              return [...prevVal, "good"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Good</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"fair"}
                        size={"lg"}
                        isChecked={bookCond.includes("fair") ? true : false}
                        onChange={() => {
                          if (bookCond.includes("fair")) {
                            setBookCond((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "fair";
                              });
                            });
                          } else {
                            setBookCond((prevVal) => {
                              return [...prevVal, "fair"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Fair</Text>
                      </Checkbox>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </VStack>
        <VStack w={"75%"} h={"100%"} ml={"28%"}>
          <Box w={"100%"}>
            <Box
              w={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"1rem"}
            >
              <Box>
                <Text fontSize={"1.2rem"}>
                  Buy Second Hand Engineering Books At Affordable Prices
                </Text>
              </Box>
              <Box>
                {/* Sort option */}
                <Menu>
                  <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: "gray.100" }}
                  >
                    {sort === ""
                      ? "Sort "
                      : sort === "Newest"
                      ? "Newest "
                      : sort === "LTH"
                      ? "Price - Low to High "
                      : "Price - High to Low "}
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      _hover={{ color: "#FB635D" }}
                      transition={"0.2s all"}
                      value={"Newest"}
                      onClick={(e) => {
                        setSort(e.target.value);
                        sortBooks(e.target.value);
                      }}
                    >
                      Newest First
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      _hover={{ color: "#FB635D" }}
                      transition={"0.2s all"}
                      value={"LTH"}
                      onClick={(e) => {
                        setSort(e.target.value);
                        sortBooks(e.target.value);
                      }}
                    >
                      Price - Low to High
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      _hover={{ color: "#FB635D" }}
                      transition={"0.2s all"}
                      value={"HTL"}
                      onClick={(e) => {
                        setSort(e.target.value);
                        sortBooks(e.target.value);
                      }}
                    >
                      Price - High to Low
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            {/* Item cards */}
            <Box display={"flex"} flexWrap={"wrap"} gap={"2rem"} pb={"1rem"}>
              {/* mapping the data and showing cards */}
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
              {!loading &&
                booksArr.map((book) => {
                  return (
                    <ItemCard
                      bookName={book.name}
                      bookPrice={book.price}
                      bookDPrice={book.discountedPrice}
                      bookImg={book.image}
                      bookId={book._id}
                      wishlistArr={wishlistArr}
                      key={book._id}
                    />
                  );
                })}
            </Box>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default BuyBook;
