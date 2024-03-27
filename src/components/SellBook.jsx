import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Image,
  Input,
  Select,
  Table,
  Text,
  Textarea,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../constant";

const SellBook = () => {
  const [bookImageArr, setBookImageArr] = useState([]);
  const [bookCloudURL, setBookCloudURL] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDiscountBox, setShowDiscountBox] = useState(false);

  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    bookPrice: "",
    bookDescription: "",
    bookCondition: "",
    bookDiscountedPrice: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toast = useToast();

  function showToast(statusCode) {
    toast({
      title:
        statusCode === 200
          ? "Book listed for sale"
          : "An error occured while listing the book",
      status: statusCode === 200 ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  }

  document
    ?.getElementById("numericInput3")
    ?.addEventListener("wheel", function (event) {
      // Disable scrolling behavior when the input is focused
      if (document.activeElement === document.getElementById("numericInput3")) {
        event.preventDefault();
      }
    });

  const uploadFileToCloud = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", "swapBook");
    formData.append("cloud_name", "dizoqzvu3");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dizoqzvu3/image/upload",
      formData
    );

    console.log("Image uploaded");
    return response?.data?.secure_url;
  };

  const showBlobImage = (image) => {
    let imgUrl = URL.createObjectURL(image);
    return imgUrl;
  };

  // Error Resolved: Files are being uploaded to cloudinary, but not shown then array is logged using console.log, on line 72
  // Why error occured : Map function is async whereas for loop is synchronous
  let bookUrlArray = [];

  const getBookImages = async () => {
    for (let i = 0; i < bookImageArr.length; i++) {
      let newBook = await uploadFileToCloud(bookImageArr[i]);
      console.log(newBook);
      bookUrlArray.push(newBook);
    }

    // setBookCloudURL((prevVal) => {
    //   return [...prevVal, ...bookUrlArray];
    // });
    console.log("Images uploaded");
    return bookUrlArray;
  };

  const registerBook = async () => {
    try {
      setLoading(true);
      let imagesArr = [];
      imagesArr = imagesArr.length != 0 ? null : await getBookImages();
      console.log(imagesArr);

      let data = await axios.post(`${url}/listBook`, {
        imagesArr,
        bookDetails,
      });

      if (data.status === 200) {
        showToast(200);
      } else {
        showToast(data.status);
      }
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={"100vw"}
      mt={"6rem"}
      pt={"3rem"}
      pl={"8rem"}
      pr={"8rem"}
      bgColor={"#f5ffff"}
      fontFamily={"Poppins"}
    >
      <Box>
        <Text fontSize={"1.3rem"} fontWeight={"500"}>
          Upload Book Image
        </Text>
      </Box>
      {/* Images */}
      <Box mt={"1.5rem"} display={"flex"} gap={"3rem"}>
        {/* Img 1 */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Image
            cursor={"pointer"}
            fallbackSrc="https://as1.ftcdn.net/v2/jpg/02/16/23/78/1000_F_216237809_1dx5fNiBB3wL5r80Q8rEyK8jYH83lXid.jpg"
            w={"7rem"}
            h={"7rem"}
            src={bookImageArr[0] ? showBlobImage(bookImageArr[0]) : null}
            boxShadow={bookImageArr[0] ? "0 0 1px #a1a1a1" : null}
            p={"0.5rem"}
          />

          <FormLabel
            htmlFor="image1"
            p={"0.5rem 1.5rem 0.5rem 1.5rem"}
            bgColor={"#dd6b20"}
            color={"#fff"}
            _hover={{ bgColor: "#C05621" }}
            cursor={"pointer"}
            borderRadius={"0.4rem"}
            margin={"auto"}
            mt={"0.5rem"}
            visibility={bookImageArr[0] ? "hidden" : "visible"}
          >
            Upload Image
          </FormLabel>

          <Input
            type="file"
            id="image1"
            display={"none"}
            onChange={(e) => {
              // console.log(e.target.files[0]);
              setBookImageArr([...bookImageArr, e.target.files[0]]);
            }}
          />
        </Box>
        {/* Img 2 */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Image
            cursor={"pointer"}
            fallbackSrc="https://as1.ftcdn.net/v2/jpg/02/16/23/78/1000_F_216237809_1dx5fNiBB3wL5r80Q8rEyK8jYH83lXid.jpg"
            w={"7rem"}
            h={"7rem"}
            src={bookImageArr[1] ? showBlobImage(bookImageArr[1]) : null}
            boxShadow={bookImageArr[1] ? "0 0 1px #a1a1a1" : null}
            p={"0.5rem"}
          />
          <FormLabel
            htmlFor="image2"
            p={"0.5rem 1.5rem 0.5rem 1.5rem"}
            bgColor={"#dd6b20"}
            color={"#fff"}
            _hover={{ bgColor: "#C05621" }}
            cursor={"pointer"}
            borderRadius={"0.4rem"}
            margin={"auto"}
            mt={"0.5rem"}
            visibility={bookImageArr[1] ? "hidden" : "visible"}
          >
            Upload Image
          </FormLabel>
          <Input
            type="file"
            id="image2"
            display={"none"}
            onChange={(e) => {
              // console.log(e.target.files[0]);
              setBookImageArr([...bookImageArr, e.target.files[0]]);
            }}
          />
        </Box>
        {/* Img 3 */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Image
            cursor={"pointer"}
            fallbackSrc="https://as1.ftcdn.net/v2/jpg/02/16/23/78/1000_F_216237809_1dx5fNiBB3wL5r80Q8rEyK8jYH83lXid.jpg"
            w={"7rem"}
            h={"7rem"}
            src={bookImageArr[2] ? showBlobImage(bookImageArr[2]) : null}
            boxShadow={bookImageArr[2] ? "0 0 1px #a1a1a1" : null}
            p={"0.5rem"}
          />
          <FormLabel
            htmlFor="image3"
            p={"0.5rem 1.5rem 0.5rem 1.5rem"}
            bgColor={"#dd6b20"}
            color={"#fff"}
            _hover={{ bgColor: "#C05621" }}
            cursor={"pointer"}
            borderRadius={"0.4rem"}
            margin={"auto"}
            mt={"0.5rem"}
            visibility={bookImageArr[2] ? "hidden" : "visible"}
          >
            Upload Image
          </FormLabel>
          <Input
            type="file"
            id="image3"
            display={"none"}
            onChange={(e) => {
              // console.log(e.target.files[0]);
              setBookImageArr([...bookImageArr, e.target.files[0]]);
            }}
          />
        </Box>
        {/* Img 4 */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Image
            cursor={"pointer"}
            fallbackSrc="https://as1.ftcdn.net/v2/jpg/02/16/23/78/1000_F_216237809_1dx5fNiBB3wL5r80Q8rEyK8jYH83lXid.jpg"
            w={"7rem"}
            h={"7rem"}
            src={bookImageArr[3] ? showBlobImage(bookImageArr[3]) : null}
            boxShadow={bookImageArr[3] ? "0 0 1px #a1a1a1" : null}
            p={"0.5rem"}
          />
          <FormLabel
            htmlFor="image4"
            p={"0.5rem 1.5rem 0.5rem 1.5rem"}
            bgColor={"#dd6b20"}
            color={"#fff"}
            _hover={{ bgColor: "#C05621" }}
            cursor={"pointer"}
            borderRadius={"0.4rem"}
            margin={"auto"}
            mt={"0.5rem"}
            visibility={bookImageArr[3] ? "hidden" : "visible"}
          >
            Upload Image
          </FormLabel>
          <Input
            type="file"
            id="image4"
            display={"none"}
            onChange={(e) => {
              // console.log(e.target.files[0]);
              setBookImageArr([...bookImageArr, e.target.files[0]]);
            }}
          />
        </Box>
      </Box>
      {/* Book name */}
      <Box
        mt={"3rem"}
        display={"flex"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
      >
        <Box>
          <Text fontSize={"1.2rem"} fontWeight={"500"}>
            Book name :{" "}
          </Text>
        </Box>
        <Box>
          <Input
            border={"1px solid #333"}
            w={"30rem"}
            _hover={{ border: "1px solid #aaa" }}
            type="text"
            value={bookDetails.bookName}
            name="bookName"
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          />
        </Box>
      </Box>
      {/* Book Price */}
      <Box
        mt={"3rem"}
        display={"flex"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
        ml={"-2.8rem"}
      >
        <Box>
          <Text fontSize={"1.2rem"} fontWeight={"500"}>
            Book price (INR) :{" "}
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Input
            border={"1px solid #333"}
            w={"30rem"}
            _hover={{ border: "1px solid #aaa" }}
            type="number"
            value={bookDetails.bookPrice}
            id="numericInput3"
            letterSpacing={"0.1rem"}
            name="bookPrice"
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          />
          <Tooltip
            label="Suggested price for second hand books is between 50% to 55% of actual M.R.P."
            placement={"right"}
            hasArrow
          >
            <Text>
              <i className="fa-solid fa-circle-info"></i>
            </Text>
          </Tooltip>
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"0.6rem"}
        mt={"1.5rem"}
        ml={"10rem"}
      >
        <Checkbox
          size={"lg"}
          value={showDiscountBox}
          onChange={(e) => {
            setShowDiscountBox(e.target.checked);
          }}
        />
        <Text>Set discounted price</Text>
      </Box>
      {/* Book Discounted Price */}
      {showDiscountBox && (
        <Box
          mt={"3rem"}
          display={"flex"}
          alignItems={"center"}
          gap={"2rem"}
          justifyContent={"left"}
          ml={"-6.7rem"}
        >
          <Box>
            <Text fontSize={"1.2rem"} fontWeight={"500"}>
              Discounted price (INR) :{" "}
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Input
              border={"1px solid #333"}
              w={"30rem"}
              _hover={{ border: "1px solid #aaa" }}
              type="number"
              value={bookDetails.bookDiscountedPrice}
              id="numericInput3"
              letterSpacing={"0.1rem"}
              name="bookDiscountedPrice"
              onChange={(e) => {
                setBookDetails((prevVal) => {
                  return { ...bookDetails, [e.target.name]: e.target.value };
                });
              }}
            />
          </Box>
        </Box>
      )}
      {/* Book description */}
      <Box
        mt={"3rem"}
        display={"flex"}
        alignItems={"top"}
        gap={"2rem"}
        justifyContent={"left"}
        ml={"-3rem"}
      >
        <Box>
          <Text fontSize={"1.2rem"} fontWeight={"500"}>
            Book description :{" "}
          </Text>
        </Box>
        <Box>
          <Textarea
            w={"30rem"}
            border={"1px solid #333"}
            value={bookDetails.bookDescription}
            _hover={{ border: "1px solid #aaa" }}
            rows={"3"}
            type="text"
            name="bookDescription"
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          />
        </Box>
      </Box>
      {/* Book condition */}
      <Box
        mt={"3rem"}
        display={"flex"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
        ml={"-3rem"}
      >
        <Box>
          <Text fontSize={"1.2rem"} fontWeight={"500"}>
            Book condition :{" "}
          </Text>
        </Box>
        <Box>
          <Select
            placeholder="Select condition"
            name="bookCondition"
            value={bookDetails.bookCondition}
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          >
            <option value={"new"}>New</option>
            <option value={"excellent"}>Excellent</option>
            <option value={"good"}>Good</option>
            <option value={"fair"}>Fair</option>
          </Select>
        </Box>
      </Box>
      <Box mt={"3rem"} pb={"3rem"} ml={"-3rem"}>
        <Button
          colorScheme="blue"
          padding={"0.5rem 3rem 0.5rem 3rem"}
          fontSize={"1.1rem"}
          onClick={registerBook}
          isLoading={loading}
        >
          List for sale
        </Button>
      </Box>
    </Box>
  );
};

export default SellBook;
