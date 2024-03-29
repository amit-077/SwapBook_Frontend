import React, { useContext, useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { UserContext } from "../Context/ContextAPI";
import url from "../constant";

const ShowModal = () => {
  const toast = useToast();
  const { isOpen, onClose, onOpen, user, setUser } = useContext(UserContext);

  const showToast = (title, status, duration) => {
    toast({
      title: title,
      status: status,
      duration: duration,
    });
  };

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const [signupUser, setSignupUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    college: "",
    latitude: "",
    longitude: "",
    otp: "",
  });

  const [show, setShow] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  function clearInputs() {
    setSignupUser({
      name: "",
      email: "",
      password: "",
      mobile: "",
      college: "",
      latitude: "",
      longitude: "",
      otp: "",
    });

    setLoginUser({
      email: "",
      password: "",
    });
  }

  const fetchUserLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setUserLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        setSignupUser({
          ...signupUser,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
    setLocationLoading(false);
  };

  const registerUser = async () => {
    setSignupLoading(true);
    try {
      let data = await axios.post(`${url}/register`, { signupUser });
      console.log(data);
      if (data.status === 201) {
        setShowOTP(true);
        showToast("An OTP has been sent to your mail", "success", 3000);
      } else if (data.status === 200) {
        data.data.password = undefined;
        console.log(data.data);
        setUser(data.data);
        localStorage.setItem("SwapBook", JSON.stringify(data.data));
        clearInputs();
        showToast("User registered successfully", "success", 3000);
        onClose();
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 402) {
        showToast("Invalid OTP", "error", 3000);
      } else if (e.response.status === 400) {
        showToast("User exists", "error", 3000);
      } else if (e.response.status === 401) {
        showToast("Please fill all the fields", "error", 3000);
      } else {
        showToast("An error occured, please try again later", "error", 3000);
      }
    }
    setSignupLoading(false);
  };

  const signinUser = async () => {
    setLoginLoading(true);
    try {
      let data = await axios.post(
        `${url}/login`,
        { loginUser },
        { withCredentials: true }
      );
      if (data.status === 200) {
        console.log(data.data.userExists);
        data.data.userExists.password = undefined;
        setUser(data.data.userExists);
        localStorage.setItem("SwapBook", JSON.stringify(data.data.userExists));
        clearInputs();
        showToast("Login successful!", "success", 3000);
        onClose();
      }
    } catch (e) {
      console.log(e);
      if (e?.response?.status === 402) {
        showToast("User does not exist", "error", 3000);
      } else if (e?.response?.status === 400) {
        showToast("Invalid credentials", "error", 3000);
      } else {
        showToast("An error occured, please try again later", "error", 3000);
      }
    }
    setLoginLoading(false);
  };

  document
    ?.getElementById("numericInput1")
    ?.addEventListener("wheel", function (event) {
      // Disable scrolling behavior when the input is focused
      if (document.activeElement === document.getElementById("numericInput1")) {
        event.preventDefault();
      }
    });

  document
    ?.getElementById("numericInput2")
    ?.addEventListener("wheel", function (event) {
      // Disable scrolling behavior when the input is focused
      if (document.activeElement === document.getElementById("numericInput2")) {
        event.preventDefault();
      }
    });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent pt={"0.5rem"} pb={"1rem"}>
        <Tabs variant={"enclosed"}>
          <TabList gap={"1rem"} fontFamily={"Poppins"}>
            <Tab color={"#0a66c2"}>Login</Tab>
            <Tab color={"#0a66c2"}>Sign up</Tab>
            <Tab color={"#0a66c2"}>Forgot password?</Tab>
          </TabList>

          <TabPanels>
            {/* first panel */}
            <TabPanel>
              <Box>
                <Box>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Email address
                    </FormLabel>
                    <Input
                      fontFamily={"Poppins"}
                      type="email"
                      name="email"
                      onChange={(e) => {
                        setLoginUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        fontFamily={"Poppins"}
                        type={show ? "password" : "text"}
                        name="password"
                        onChange={(e) => {
                          setLoginUser((prevVal) => {
                            return {
                              ...prevVal,
                              [e.target.name]: e.target.value,
                            };
                          });
                        }}
                      />
                      <InputRightElement mr={"1rem"}>
                        <Button
                          pl={"2rem"}
                          pr={"2rem"}
                          height={"80%"}
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          {show ? "show" : "hide"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    mt={"2rem"}
                    p={"0.5rem 2.5rem 0.5rem 2.5rem"}
                    fontSize={"1.1rem"}
                    onClick={signinUser}
                    isLoading={loginLoading}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </TabPanel>
            {/* second panel */}
            <TabPanel>
              <Box>
                <Box>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Name
                    </FormLabel>
                    <Input
                      fontFamily={"Poppins"}
                      type="text"
                      name="name"
                      value={signupUser.name}
                      onChange={(e) => {
                        setSignupUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Email address
                    </FormLabel>
                    <Input
                      fontFamily={"Poppins"}
                      type="email"
                      name="email"
                      value={signupUser.email}
                      onChange={(e) => {
                        setSignupUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        fontFamily={"Poppins"}
                        type={show ? "password" : "text"}
                        name="password"
                        value={signupUser.password}
                        onChange={(e) => {
                          setSignupUser((prevVal) => {
                            return {
                              ...prevVal,
                              [e.target.name]: e.target.value,
                            };
                          });
                        }}
                      />
                      <InputRightElement mr={"1rem"}>
                        <Button
                          pl={"2rem"}
                          pr={"2rem"}
                          height={"80%"}
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          {show ? "show" : "hide"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      Phone number
                    </FormLabel>
                    <Input
                      fontFamily={"Poppins"}
                      type="number"
                      name="mobile"
                      id="numericInput1"
                      value={signupUser.mobile}
                      onChange={(e) => {
                        if (e.target.value.length > 10) {
                          return;
                        }
                        setSignupUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontWeight={"500"}
                      mt={"1rem"}
                      display={"flex"}
                      alignItems={"center"}
                      value={signupUser.college}
                      gap={"0.7rem"}
                    >
                      <Text>College Name</Text>
                      <Tooltip
                        label="Sellers studying in same college as you will be shown"
                        placement={"right"}
                        hasArrow
                      >
                        <Text transform={"scale(0.9)"}>
                          <i className="fa-solid fa-circle-info"></i>
                        </Text>
                      </Tooltip>
                    </FormLabel>
                    {/* <Input type="email" name="email" /> */}
                    <Select
                      fontFamily={"Poppins"}
                      placeholder="Select college"
                      name="college"
                      onChange={(e) => {
                        setSignupUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    >
                      <option value={"PVGCOET"}>PVGCOET, Pune</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      fontWeight={"500"}
                      mt={"1rem"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.7rem"}
                    >
                      <Text>Location</Text>
                      <Tooltip
                        label="Sellers nearest to you will be shown"
                        placement={"right"}
                        hasArrow
                      >
                        <Text transform={"scale(0.9)"}>
                          <i className="fa-solid fa-circle-info"></i>
                        </Text>
                      </Tooltip>
                    </FormLabel>
                    <Box display={"flex"} gap={"1rem"}>
                      <Input
                        fontFamily={"Poppins"}
                        type="text"
                        name="latitude"
                        value={signupUser?.latitude}
                        w={"30%"}
                        placeholder="Latitude"
                      />
                      <Input
                        fontFamily={"Poppins"}
                        type="text"
                        name="longitude"
                        value={signupUser?.longitude}
                        w={"30%"}
                        placeholder="Longitude"
                      />
                      <Button
                        colorScheme="blue"
                        onClick={fetchUserLocation}
                        fontFamily={"Poppins"}
                        fontWeight={"100"}
                        isLoading={locationLoading}
                      >
                        Get Location
                      </Button>
                    </Box>
                  </FormControl>
                  {/* OTP Field */}
                  <FormControl display={showOTP ? "block" : "none"}>
                    <FormLabel fontWeight={"500"} mt={"1rem"}>
                      OTP
                    </FormLabel>
                    <Input
                      fontFamily={"Poppins"}
                      type="number"
                      name="otp"
                      id="numericInput2"
                      value={signupUser.otp}
                      width={"20%"}
                      textAlign={"center"}
                      letterSpacing={"0.5rem"}
                      onChange={(e) => {
                        if (e.target.value.length > 6) {
                          return;
                        }
                        setSignupUser((prevVal) => {
                          return {
                            ...prevVal,
                            [e.target.name]: e.target.value,
                          };
                        });
                      }}
                    />
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    mt={"2rem"}
                    p={"0.5rem 2.5rem 0.5rem 2.5rem"}
                    fontSize={"1.1rem"}
                    onClick={registerUser}
                    fontFamily={"Poppins"}
                    fontWeight={"300"}
                    isLoading={signupLoading}
                  >
                    Sign Up
                  </Button>
                  <Button
                    colorScheme="blue"
                    mt={"2rem"}
                    p={"0.5rem 2.5rem 0.5rem 2.5rem"}
                    fontSize={"1.1rem"}
                    onClick={() => {
                      setSignupUser({
                        name: "ben",
                        email: "ben10realfan@gmail.com",
                        password: "123456",
                        mobile: "9988776655",
                        college: "PVGCOET",
                      });
                    }}
                  >
                    Get sample Data
                  </Button>
                </Box>
              </Box>
            </TabPanel>
            {/* Third panel */}
            <TabPanel>
              <FormControl>
                <FormLabel fontWeight={"500"} mt={"1rem"}>
                  Email address
                </FormLabel>
                <Input type="email" name="email" fontFamily={"Poppins"} />
              </FormControl>

              <Button
                colorScheme="blue"
                mt={"2rem"}
                p={"0.5rem 2.5rem 0.5rem 2.5rem"}
                fontSize={"1.1rem"}
              >
                Get OTP
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

export default ShowModal;
