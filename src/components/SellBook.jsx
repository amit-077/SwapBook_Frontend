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
  const [localImages, setLocalImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDiscountBox, setShowDiscountBox] = useState(false);
  const [progress, setProgress] = useState(0);

  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    bookPrice: "",
    bookDiscountedPrice: "",
    bookYear: "",
    bookBranch: "",
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

  const config = {
    onUploadProgress: (e) => {
      console.log((e.loaded / e.total) * 100);
      setProgress((e.loaded / e.total) * 100);
    },
  };

  const uploadFileToCloud = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", "swapBook");
    formData.append("cloud_name", "dizoqzvu3");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dizoqzvu3/image/upload",
      formData,
      config
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
    if (
      bookImageArr.length < 1 ||
      !bookDetails.bookName ||
      !bookDetails.bookPrice ||
      !bookDetails.bookBranch ||
      !bookDetails.bookYear
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 2000,
      });
      return;
    }
    try {
      setLoading(true);
      let imagesArr = [];
      imagesArr = imagesArr.length != 0 ? null : await getBookImages();
      console.log(imagesArr);

      let data = await axios.post(
        `${url}/listBook`,
        {
          imagesArr,
          bookDetails,
        },
        {
          withCredentials: true,
        }
      );

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

  const checkImageExists = (img) => {
    if (
      img.type != "image/png" &&
      img.type != "image/jpg" &&
      img.type != "image/jpeg"
    ) {
      toast({
        title: "Please upload an image",
        status: "warning",
        duration: 2000,
      });
      return true;
    }
    for (let i = 0; i < bookImageArr.length; i++) {
      console.log(bookImageArr[i].name === img.name);
      if (bookImageArr[i].name === img.name) {
        toast({
          title: "Cannot upload same image twice",
          status: "error",
          duration: 2000,
        });
        return true;
      }
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
            fallbackSrc="/images/place19.png"
            w={"7rem"}
            h={"7rem"}
            src={localImages[0]}
            boxShadow={bookImageArr[0] ? "0 0 1px #a1a1a1" : "0 0 1px #d9d9d9"}
            p={"0.5rem"}
            onClick={() => {
              document.getElementById("image1").click();
            }}
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
              console.log(e.target.files[0]);
              if (checkImageExists(e.target.files[0])) {
                return;
              }
              setBookImageArr([...bookImageArr, e.target.files[0]]);
              setLocalImages([
                ...localImages,
                showBlobImage(e.target.files[0]),
              ]);
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
            fallbackSrc="/images/place19.png"
            w={"7rem"}
            h={"7rem"}
            src={localImages[1]}
            boxShadow={bookImageArr[1] ? "0 0 1px #a1a1a1" : "0 0 1px #d9d9d9"}
            p={"0.5rem"}
            onClick={() => {
              document.getElementById("image2").click();
            }}
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
              if (checkImageExists(e.target.files[0])) {
                return;
              }
              setBookImageArr([...bookImageArr, e.target.files[0]]);
              setLocalImages([
                ...localImages,
                showBlobImage(e.target.files[0]),
              ]);
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
            fallbackSrc="/images/place19.png"
            w={"7rem"}
            h={"7rem"}
            src={localImages[2]}
            boxShadow={bookImageArr[2] ? "0 0 1px #a1a1a1" : "0 0 1px #d9d9d9"}
            p={"0.5rem"}
            onClick={() => {
              document.getElementById("image3").click();
            }}
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
              if (checkImageExists(e.target.files[0])) {
                return;
              }
              setBookImageArr([...bookImageArr, e.target.files[0]]);
              setLocalImages([
                ...localImages,
                showBlobImage(e.target.files[0]),
              ]);
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
            fallbackSrc="/images/place19.png"
            w={"7rem"}
            h={"7rem"}
            src={localImages[3]}
            boxShadow={bookImageArr[3] ? "0 0 1px #a1a1a1" : "0 0 1px #d9d9d9"}
            p={"0.5rem"}
            onClick={() => {
              document.getElementById("image4").click();
            }}
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
              if (checkImageExists(e.target.files[0])) {
                return;
              }
              setBookImageArr([...bookImageArr, e.target.files[0]]);
              setLocalImages([
                ...localImages,
                showBlobImage(e.target.files[0]),
              ]);
            }}
          />
        </Box>
      </Box>
      {/* Book name */}
      <Box
        mt={"3rem"}
        // display={"flex"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
      >
        <Box>
          <Text fontSize={"1rem"} fontWeight={"500"}>
            Book name :{" "}
          </Text>
        </Box>
        <Box mt={"0.5rem"}>
          <Input
            border={"1px solid #aaa"}
            bgColor={"rgba(255,255,255,0.5)"}
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
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
      >
        <Box>
          <Text fontSize={"1rem"} fontWeight={"500"}>
            Book price (INR) :{" "}
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"} mt={"0.5rem"}>
          <Input
            border={"1px solid #aaa"}
            bgColor={"rgba(255,255,255,0.5)"}
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
            label="Suggested price for second hand books is between 45% to 50% of actual M.R.P."
            placement={"right"}
            hasArrow
          >
            <Text>
              <i className="fa-solid fa-circle-info"></i>
            </Text>
          </Tooltip>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"0.6rem"} mt={"1.5rem"}>
        <Checkbox
          size={"lg"}
          value={showDiscountBox}
          isChecked={showDiscountBox}
          onChange={(e) => {
            setShowDiscountBox(e.target.checked);
          }}
        />
        <Text
          cursor={"pointer"}
          onClick={() => {
            setShowDiscountBox(!showDiscountBox);
          }}
        >
          Set discounted price
        </Text>
      </Box>
      {/* Book Discounted Price */}
      {showDiscountBox && (
        <Box
          mt={"3rem"}
          alignItems={"center"}
          gap={"2rem"}
          justifyContent={"left"}
        >
          <Box>
            <Text fontSize={"1rem"} fontWeight={"500"}>
              Discounted price (INR) :{" "}
            </Text>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            mt={"0.5rem"}
          >
            <Input
              border={"1px solid #aaa"}
              bgColor={"rgba(255,255,255,0.5)"}
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
      {/* <Box mt={"3rem"} alignItems={"top"} gap={"2rem"} justifyContent={"left"}>
        <Box>
          <Text fontSize={"1.1rem"} fontWeight={"500"}>
            Book description (optional):{" "}
          </Text>
        </Box>
        <Box mt={"0.5rem"}>
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
      </Box> */}
      {/* Book Year */}
      <Box
        mt={"3rem"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
      >
        <Box>
          <Text fontSize={"1rem"} fontWeight={"500"}>
            Which Year :{" "}
          </Text>
        </Box>
        <Box mt={"0.5rem"}>
          <Select
            placeholder="Select Year"
            w={"20%"}
            name="bookYear"
            value={bookDetails.bookYear}
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          >
            <option value={"First"}>F.E.</option>
            <option value={"Second"}>S.E.</option>
            <option value={"Third"}>T.E.</option>
            <option value={"Forth"}>B.E.</option>
          </Select>
        </Box>
      </Box>
      {/* Book Branch */}
      <Box
        mt={"3rem"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"left"}
      >
        <Box>
          <Text fontSize={"1rem"} fontWeight={"500"}>
            Which Branch :{" "}
          </Text>
        </Box>
        <Box mt={"0.5rem"}>
          <Select
            placeholder="Select Branch"
            w={"20%"}
            name="bookBranch"
            value={bookDetails.bookBranch}
            onChange={(e) => {
              setBookDetails((prevVal) => {
                return { ...bookDetails, [e.target.name]: e.target.value };
              });
            }}
          >
            <option value={"Computer"}>Computer</option>
            <option value={"IT"}>IT</option>
            <option value={"Mechanical"}>Mechanical</option>
            <option value={"Civil"}>Civil</option>
            <option value={"Electrical"}>Electrical</option>
            <option value={"EnTC"}>EnTC</option>
            <option value={"Printing"}>Printing</option>
            <option value={"Other"}>Other</option>
          </Select>
        </Box>
      </Box>
      <Box mt={"3rem"} pb={"3rem"}>
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
