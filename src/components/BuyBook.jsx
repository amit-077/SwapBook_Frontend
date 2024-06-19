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
import React, { useContext, useEffect, useState } from "react";
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
import url from "../constant";
import { UserContext } from "../Context/ContextAPI";

const BuyBook = () => {
  const [sliderValue1, setSliderValue1] = useState(50);
  const [sliderValue2, setSliderValue2] = useState(5000);
  const [locationRange, setLocationRange] = useState(11);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [booksArr, setBooksArr] = useState([]);
  const [firstVisit, setFirstVisit] = useState(false);
  const [sort, setSort] = useState("");
  const [wishlistArr, setWishlistArr] = useState("");
  const [bookYear, setBookYear] = useState([]); // set book condition for filtering books with condition
  const [loading, setLoading] = useState(false);
  const [bookBranch, setBookBranch] = useState("");

  const { books, setBooks, setBackupBooks, backupBooks } =
    useContext(UserContext);

  const getAllBooks = async () => {
    setLoading(true);
    try {
      let data = await axios.get(`${url}/getAllBooks`);
      setBooks(data.data);
      setBackupBooks(data.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (books.length === 0) {
      getAllBooks();
    }
  }, []);

  // Get all books for display
  // useEffect(() => {
  //   const getAllBooks = async () => {
  //     setLoading(true);
  //     try {
  //       let data = await axios.get(`${url}/getAllBooks`);
  //       setBooksArr(data.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };

  //   getAllBooks();
  // }, []);

  // Get the current user to add wishlist books to his collection. Get updated user, not local storage wala user.
  useEffect(() => {
    const getWishlistBooks = async () => {
      const data = await axios.post(
        `${url}/getWishlist`,
        { populate: false },
        { withCredentials: true }
      );
      setWishlistArr(data.data.wishlist);
    };

    getWishlistBooks();
  }, []);

  // UseEffect for handling debouncing / throttling

  useEffect(() => {
    let changeValue; // variable for clearing and setting timeout

    changeValue = setTimeout(() => {
      firstVisit && setPriceRange();
    }, 500);

    setFirstVisit(true);

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
    try {
      setLoading(true);
      const data = await axios.post(`${url}/sortBooks`, { sortQuery: sort });
      setBooks(data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const setPriceRange = async () => {
    setLoading(true);
    let data = await axios.post(`${url}/price`, {
      low: sliderValue1,
      high: sliderValue2,
    });
    setBooks(data.data);
    setLoading(false);
  };

  // useEffect(() => {
  //   const bookCondition = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.post(`${url}/bookCondition`, { bookCond });
  //       setBooks(data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   bookCond.length > 0 && bookCondition();
  // }, [bookCond]);

  const selectYear = async (year) => {
    //  Instead of doing sorting of year books locally, I have sent query to backend.
    try {
      setLoading(true);
      let { data } = await axios.post(`${url}/sortByYear`, { bookYear: year });
      setBooks(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const selectBranch = async (branch) => {
    console.log(branch);
    try {
      setLoading(true);
      let { data } = await axios.post(`${url}/sortByBranch`, {
        bookBranch: branch,
      });
      setBooks(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Sort By Year
  useEffect(() => {
    if (bookYear.length === 0) {
      setBooks(backupBooks);
      return;
    }
    selectYear(bookYear);
  }, [bookYear]);

  // Sort By Branch
  useEffect(() => {
    if (!bookBranch) {
      setBooks(backupBooks);
      return;
    }
    selectBranch(bookBranch);
  }, [bookBranch]);

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
            {/* <Menu>
              <MenuDivider />
            </Menu> */}
            {/* Filter by location */}

            {/* Location title */}
            {/* <Box pl={"1.5rem"} pr={"1.5rem"}>
              <Text fontSize={"1.2rem"}>Filter by location</Text>
            </Box> */}

            {/* Location slider */}
            {/* <Box mt={"1rem"} pl={"1.5rem"} pr={"1.5rem"} pb={"1rem"}>
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
            </Box> */}
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
                      <Text fontSize={"1.2rem"}>Book Year</Text>
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
                        value={"First"}
                        size={"lg"}
                        isChecked={bookYear.includes("First") ? true : false}
                        onChange={() => {
                          if (bookYear.includes("First")) {
                            setBookYear((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "First";
                              });
                            });
                          } else {
                            setBookYear((prevVal) => {
                              return [...prevVal, "First"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>First Year</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"Second"}
                        size={"lg"}
                        isChecked={bookYear.includes("Second") ? true : false}
                        onChange={() => {
                          if (bookYear.includes("Second")) {
                            setBookYear((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "Second";
                              });
                            });
                          } else {
                            setBookYear((prevVal) => {
                              return [...prevVal, "Second"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Second Year</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"Third"}
                        size={"lg"}
                        isChecked={bookYear.includes("Third") ? true : false}
                        onChange={() => {
                          if (bookYear.includes("Third")) {
                            setBookYear((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "Third";
                              });
                            });
                          } else {
                            setBookYear((prevVal) => {
                              return [...prevVal, "Third"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Third Year</Text>
                      </Checkbox>
                    </Box>
                    {/* first item */}
                    <Box>
                      <Checkbox
                        value={"Forth"}
                        size={"lg"}
                        isChecked={bookYear.includes("Forth") ? true : false}
                        onChange={() => {
                          if (bookYear.includes("Forth")) {
                            setBookYear((prevVal) => {
                              return prevVal.filter((cond) => {
                                return cond != "Forth";
                              });
                            });
                          } else {
                            setBookYear((prevVal) => {
                              return [...prevVal, "Forth"];
                            });
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Forth Year</Text>
                      </Checkbox>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Book Branch */}
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
                      <Text fontSize={"1.2rem"}>Book Branch</Text>
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
                        value={"Computer"}
                        size={"lg"}
                        isChecked={bookBranch === "Computer"}
                        onChange={() => {
                          if (bookBranch === "Computer") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Computer");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Computer</Text>
                      </Checkbox>
                    </Box>
                    {/* second item */}
                    <Box>
                      <Checkbox
                        value={"IT"}
                        size={"lg"}
                        isChecked={bookBranch === "IT"}
                        onChange={() => {
                          if (bookBranch === "IT") {
                            setBookBranch("");
                          } else {
                            setBookBranch("IT");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>IT</Text>
                      </Checkbox>
                    </Box>
                    {/* third item */}
                    <Box>
                      <Checkbox
                        value={"Mechanical"}
                        size={"lg"}
                        isChecked={bookBranch === "Mechanical"}
                        onChange={() => {
                          if (bookBranch === "Mechanical") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Mechanical");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Mechanical</Text>
                      </Checkbox>
                    </Box>
                    {/* forth item */}
                    <Box>
                      <Checkbox
                        value={"Civil"}
                        size={"lg"}
                        isChecked={bookBranch === "Civil"}
                        onChange={() => {
                          if (bookBranch === "Civil") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Civil");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Civil</Text>
                      </Checkbox>
                    </Box>
                    {/* fifth item */}
                    <Box>
                      <Checkbox
                        value={"Electrical"}
                        size={"lg"}
                        isChecked={bookBranch === "Electrical"}
                        onChange={() => {
                          if (bookBranch === "Electrical") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Electrical");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Electrical</Text>
                      </Checkbox>
                    </Box>
                    {/* sixth item */}
                    <Box>
                      <Checkbox
                        value={"EnTC"}
                        size={"lg"}
                        isChecked={bookBranch === "EnTC"}
                        onChange={() => {
                          if (bookBranch === "EnTC") {
                            setBookBranch("");
                          } else {
                            setBookBranch("EnTC");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>EnTC</Text>
                      </Checkbox>
                    </Box>
                    {/* seventh item */}
                    <Box>
                      <Checkbox
                        value={"Printing"}
                        size={"lg"}
                        isChecked={bookBranch === "Printing"}
                        onChange={() => {
                          if (bookBranch === "Printing") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Printing");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Printing</Text>
                      </Checkbox>
                    </Box>
                    {/* Eight item */}
                    <Box>
                      <Checkbox
                        value={"Other"}
                        size={"lg"}
                        isChecked={bookBranch === "Other"}
                        onChange={() => {
                          if (bookBranch === "Other") {
                            setBookBranch("");
                          } else {
                            setBookBranch("Other");
                          }
                        }}
                      >
                        <Text fontSize={"1rem"}>Other</Text>
                      </Checkbox>
                    </Box>
                    {/* ninth item */}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {/* Book Branch */}
            <Menu>
              <MenuDivider />
            </Menu>
            {/* Clear all filters */}
            <Box mt={"1.5rem"} w={"100%"} pl={"2rem"} pr={"2rem"}>
              <Button
                bgColor={"#FB635D"}
                color={"#f5f5f5"}
                w={"100%"}
                _hover={{ bgColor: "#F05941" }}
              >
                Clear all filters
              </Button>
            </Box>
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
                <Text fontSize={"1.2rem"} fontWeight={'500'}>
                  Buy Refurbished Engineering Books At Affordable Prices
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
                books.map((book) => {
                  return (
                    <ItemCard
                      bookName={book.name}
                      bookPrice={book.price}
                      bookDPrice={book.discountedPrice}
                      bookImg={book.image}
                      bookId={book._id}
                      wishlistArr={wishlistArr}
                      key={book._id}
                      bookYear = {book.year}
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
