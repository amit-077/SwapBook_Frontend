import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useTab,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import url from "../constant";
import CartCard from "./utils/CartCard";
import Loader from "./utils/Loader";
import { UserContext } from "../Context/ContextAPI";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updateCart, setUpdateCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigation = useNavigate();

  const { user, setUser, books, setBooks, backupBooks, cart, setCart } =
    useContext(UserContext);

  const toast = useToast();

  const [addressLoading, setAddressLoading] = useState(false);
  const [enterNewAddress, setEnterNewAddress] = useState(false);

  const [address, setAddress] = useState("");

  const getCart = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(`${url}/getCart`, {
        withCredentials: true,
      });
      console.log(data);
      setCartItems(data.cartItems);
      setTotalPrice(data.totalPrice);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async () => {
    try {
      setAddressLoading(true);
      let { data } = await axios.post(
        `${url}/addAddress`,
        { address },
        { withCredentials: true }
      );
      data.cart = [];
      user.cart = [];
      setCart([]);
      console.log("Empty cart now");
      console.log(data);
      localStorage.setItem("SwapBook", JSON.stringify(data));
      navigation("/my-orders");
    } catch (e) {
      console.log(e);
    } finally {
      setAddressLoading(false);
      toast({
        title: "Ordered successfully",
        status: "success",
        duration: 3000,
      });
    }
  };

  const addOrder = async () => {
    try {
      console.log(cart);
      console.log(payment);

      let { data } = await axios.post(
        `${url}/addOrder`,
        { cart, payment },
        {
          withCredentials: true,
        }
      );

      if (data) {
        navigation("/my-orders");
        let swapBookData = JSON.parse(localStorage.getItem("SwapBook"));
        console.log(swapBookData);
      }

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCart();
  }, [updateCart]);

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      pl={"3rem"}
      pr={"3rem"}
      pt={"8rem"}
      bgColor={"#f5ffff"}
      fontFamily={"Poppins"}
    >
      {/* Modal COde */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={'3rem'} pb={'3rem'}>
            <Box
              display={"flex"}
              w={"100%"}
              justifyContent={"center"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Image src="/images/barcode.jpeg" w={"13rem"} h={"13rem"} />
              <Box w={"100%"} textAlign={"center"}>
                <Text fontSize={"1.2rem"} mt={"0.5rem"}>
                  Pay here
                </Text>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal COde */}
      <Box fontSize={"2rem"} mt={"1rem"} fontWeight={"600"}>
        <Text display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Text>
            <i class="fa-solid fa-bag-shopping"></i>
          </Text>
          My Cart
        </Text>
        {!loading && (
          <Text
            fontSize={"0.9rem"}
            mt={"0.5rem"}
            mb={"0.5rem"}
            display={"flex"}
          >
            {cartItems.length} item(s){" "}
            <Text fontWeight={"300"}>&nbsp;in your cart</Text>
          </Text>
        )}
      </Box>
      {loading && (
        <Box
          width={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"5rem"}
        >
          <Loader />
        </Box>
      )}
      {!loading && (
        <HStack
          w={"100%"}
          h={"100%"}
          justifyContent={"left"}
          alignItems={"flex-start"}
          spacing={10}
        >
          {/* Left side */}
          <VStack
            w={"60%"}
            h={"100%"}
            justifyContent={"left"}
            alignItems={"flex-start"}
            bgColor={"#fff"}
            p={"1rem 2rem 1rem 2rem"}
            mt={"1rem"}
            borderRadius={"0.5rem"}
            boxShadow={"0 0 3px #e5e5e5"}
            mb={"2rem"}
          >
            <Box
              mt={"1.5rem"}
              w={"100%"}
              display={"flex"}
              flexDir={"column"}
              gap={"2rem"}
            >
              {cartItems.length === 0 && (
                <Box
                  w={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  flexDir={"column"}
                  alignItems={"center"}
                >
                  <Box>
                    <Image
                      w={"10rem"}
                      h={"10rem"}
                      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                    />
                  </Box>
                  <Box>
                    <Text
                      fontSize={"1.4rem"}
                      fontWeight={"600"}
                      mt={"1rem"}
                      mb={"1rem"}
                      letterSpacing={"1px"}
                    >
                      YOUR CART IS EMPTY. LET'S CHANGE THAT!
                    </Text>
                  </Box>
                  <Box pb={"3rem"}>
                    <Text display={"flex"}>
                      Browse our awesome store,&nbsp;{" "}
                      <NavLink color="blue" to={"/buy-book"}>
                        <Text color={"#528cf7"}>buy books now !</Text>
                      </NavLink>
                    </Text>
                  </Box>
                </Box>
              )}
              {cartItems.map((item, index) => {
                return (
                  <CartCard
                    key={index}
                    item={item}
                    updateCart={updateCart}
                    setUpdateCart={setUpdateCart}
                  />
                );
              })}
            </Box>
            {/* Horizontal line */}
            {totalPrice && (
              <Box
                w={"100%"}
                h={"1px"}
                bgColor={"#e7e7e7"}
                mb={"1rem"}
                mt={"1rem"}
              ></Box>
            )}
            {/* Total price */}

            {totalPrice && (
              <Box
                fontSize={"1.3rem"}
                fontWeight={"600"}
                display={"flex"}
                gap={"2rem"}
                alignItems={"center"}
              >
                <Text>Total Price : </Text>
                <Text> ₹{totalPrice}</Text>
              </Box>
            )}
            {/* Horizontal line */}
            {totalPrice && (
              <Box
                w={"100%"}
                h={"1px"}
                bgColor={"#e7e7e7"}
                mb={"1rem"}
                mt={"1rem"}
              ></Box>
            )}
          </VStack>
          {/* Right side */}
          <VStack
            w={"40%"}
            h={"100%"}
            alignItems={"flex-start"}
            p={"1rem"}
            borderRadius={"0.5rem"}
            boxShadow={"0 0 3px #e5e5e5"}
            mt={"1rem"}
            bgColor={"#fff"}
          >
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              flexDir={"column"}
              gap={"1rem"}
            >
              <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
                <Text>Name : </Text>
                <Input placeholder="Enter name" value={user?.name} />
              </Box>
              <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
                <Text>Phone no : </Text>
                <Input placeholder="Enter mobile number" value={user?.mobile} />
              </Box>
              <Box display={"flex"} flexDir={"column"} gap={"0.5rem"}>
                <Text>Address : </Text>
                <Textarea
                  placeholder="Enter address"
                  rows={7}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={
                    enterNewAddress
                      ? address
                      : user?.address === "No_address"
                      ? address
                      : user?.address
                  }
                />
              </Box>

              {user?.address && (
                <Box
                  display={"flex"}
                  gap={"0.7rem"}
                  mt={"0.5rem"}
                  mb={"0.5rem"}
                >
                  <Checkbox
                    size={"lg"}
                    isChecked={enterNewAddress}
                    onChange={() => {
                      setEnterNewAddress((prevVal) => {
                        return !prevVal;
                      });
                    }}
                  />
                  <Text>Enter new address ?</Text>
                </Box>
              )}

              <Box display={"flex"} flexDir={"column"} gap={"1rem"} mb={"1rem"}>
                <Text>Payment method : </Text>
                <RadioGroup
                  onChange={(e) => {
                    setPayment(e);
                  }}
                  display={"flex"}
                  flexDir={"column"}
                  gap={"1rem"}
                >
                  <Radio value="COD">Cash On Delivery</Radio>
                  <Radio
                    value="Online"
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    UPI
                  </Radio>
                </RadioGroup>
              </Box>

              <Box w={"100%"} textAlign={"center"}>
                <Button
                  w={"100%"}
                  bgColor={"#fb635d"}
                  color={"#fff"}
                  _hover={{
                    bgColor: "#F47266",
                  }}
                  onClick={() => {
                    addAddress();
                    addOrder();
                  }}
                  isLoading={addressLoading}
                  isDisabled={cartItems.length === 0 ? true : false}
                >
                  Complete Checkout
                </Button>
              </Box>
            </Box>
          </VStack>
        </HStack>
      )}
    </Box>
  );
};

export default Cart;
