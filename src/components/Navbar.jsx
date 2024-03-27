import {
  Avatar,
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Typing, TypingStep } from "typing-effect-reactjs";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../Context/ContextAPI";
import axios from "axios";
import ShowModal from "./Modal";
import url from "../constant";

const Navbar = () => {
  const { user, setUser, isOpen, onClose, onOpen } = useContext(UserContext);
  const [link, setLink] = useState(0);

  //
  const placeholderTexts = [
    "Operating Systems",
    "Physics",
    "Engineering Mechanics",
    "Machine Learning",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(placeholderTexts[0]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const data = useLocation();

  useEffect(() => {
    setLink(1);
  }, []);

  useEffect(() => {
    if (data.pathname == "/") {
      setLink(1);
    }
    const str = data.pathname.substring(1);
    if (str == "buy-book") {
      setLink(3);
      console.log("Updated");
    } else if (str == "wishlist") {
      setLink(4);
    } else if (str == "my-books") {
      setLink(5);
    }
  }, []);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (currentCharIndex < currentText.length) {
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        setTimeout(nextText, 1000);
      }
    }, 100);

    return () => clearTimeout(typingTimer);
  }, [currentCharIndex, currentText]);

  const nextText = () => {
    setCurrentCharIndex(0);
    setCurrentIndex((currentIndex + 1) % placeholderTexts.length);
    setCurrentText(placeholderTexts[currentIndex]);
  };

  //

  const logoutUser = async () => {
    let data = await axios.get(`${url}/logout`);
    if (data.status === 200) {
      localStorage.removeItem("SwapBook");
      setUser({});
      window.location.reload();
    }
    console.log(data);
  };

  return (
    <Box w={"100vw"} fontFamily={"Poppins"}>
      {/* Modal Here */}
      <ShowModal />
      {/* Navbar content */}
      <Box
        w={"100%"}
        h={"6rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgColor={"#f5ffff"}
        position={"fixed"}
        top={0}
        zIndex={10}
      >
        <Link _hover={{ textDecoration: "none" }} href="/">
          <Box display={"flex"} alignItems={"center"}>
            <Box transform={"scale(0.45)"}>
              <Image src="/images/Logo.png" />
            </Box>
            <Box
              ml={"-2.1rem"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"right"}
              mb={"0.3rem"}
            >
              <Text fontSize={"2.3rem"} fontFamily={"Righteous"}>
                SwapBook
              </Text>
              <Text fontSize={"0.75rem"} mt={"-0.5rem"}>
                Share knowledge, Save wallets
              </Text>
            </Box>
          </Box>
        </Link>
        <Box display={"flex"} alignItems={"center"} gap={"1.2rem"}>
          {/* Auto typing effect */}
          <Box mr={"1rem"} display={link == 3 ? "block" : "none"}>
            <InputGroup>
              <InputLeftElement>
                <Search2Icon />
              </InputLeftElement>

              <Input
                borderRadius={"100"}
                // placeholder={"Search by book name"}
                placeholder={currentText.substring(0, currentCharIndex)}
                _focusVisible={{ outlineColor: "none" }}
              />
            </InputGroup>
          </Box>
          {/*  */}
          <Box>
            <NavLink to={"/"}>
              <Text
                fontSize={"1.1rem"}
                fontWeight={"700"}
                _hover={{ color: "#FB635D" }}
                color={link == 1 ? "#FB635D" : "#333"}
                onClick={() => {
                  setLink(1);
                }}
              >
                Home
              </Text>
            </NavLink>
          </Box>
          <Box ml={"2rem"}>
            <NavLink to={"/sell-book"}>
              <Text
                fontSize={"1.1rem"}
                fontWeight={"700"}
                _hover={{ color: "#FB635D" }}
                color={link == 2 ? "#FB635D" : "#333"}
                onClick={() => {
                  setLink(2);
                }}
              >
                Sell Books
              </Text>
            </NavLink>
          </Box>
          <Box ml={"2rem"}>
            <NavLink to={"/buy-book"}>
              <Text
                fontSize={"1.1rem"}
                fontWeight={"700"}
                _hover={{ color: "#FB635D" }}
                color={link == 3 ? "#FB635D" : "#333"}
                onClick={() => {
                  setLink(3);
                }}
              >
                Buy Books
              </Text>
            </NavLink>
          </Box>
        </Box>
        {/* My account */}
        <Box mr={"3rem"}>
          <Menu>
            <MenuButton>
              <Box
                ml={"5rem"}
                display={"flex"}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
                cursor={"pointer"}
                _hover={{ color: "#555" }}
              >
                <Text fontSize={"1.1rem"} role="group" fontWeight={"600"}>
                  <i
                    className="fa-regular fa-user"
                    style={{ fontWeight: "600" }}
                  ></i>
                </Text>
                <Text fontSize={"0.85rem"} fontWeight={"600"} role="group">
                  My Account
                </Text>
              </Box>
            </MenuButton>
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              {!user && (
                <MenuItem onClick={onOpen}>
                  <Box
                    display={"flex"}
                    gap={"1rem"}
                    fontSize={"1.1rem"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"1.2rem"}>
                      <i className="fa-solid fa-lock"></i>
                    </Text>
                    <Text>Login/Sign Up</Text>
                  </Box>
                </MenuItem>
              )}
              {!user && <MenuDivider />}
              {/* My Profile */}
              <MenuItem>
                <Box
                  display={"flex"}
                  gap={"1rem"}
                  fontSize={"1.1rem"}
                  alignItems={"center"}
                >
                  <Text fontSize={"1.2rem"}>
                    <i className="fa-regular fa-user"></i>
                  </Text>
                  <Text>My Profile</Text>
                </Box>
              </MenuItem>
              <MenuDivider />
              {/* My Books */}
              <NavLink to={"/my-books"}>
                <MenuItem
                  onClick={() => {
                    setLink(5);
                  }}
                >
                  <Box
                    display={"flex"}
                    gap={"1rem"}
                    fontSize={"1.1rem"}
                    alignItems={"center"}
                  >
                    <Text
                      fontSize={"1.2rem"}
                      color={link == 5 ? "#FB635D" : "#333"}
                    >
                      {link == 5 ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </Text>
                    <Text color={link == 5 ? "#FB635D" : "#333"}>My Books</Text>
                  </Box>
                </MenuItem>
              </NavLink>
              <MenuDivider />
              {/* Wishlist */}
              <NavLink to={"/wishlist"}>
                <MenuItem
                  onClick={() => {
                    setLink(4);
                  }}
                >
                  <Box
                    display={"flex"}
                    gap={"1rem"}
                    fontSize={"1.1rem"}
                    alignItems={"center"}
                  >
                    <Text
                      fontSize={"1.2rem"}
                      color={link == 4 ? "#FB635D" : "#333"}
                    >
                      {link == 4 ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </Text>
                    <Text color={link == 4 ? "#FB635D" : "#333"}>Wishlist</Text>
                  </Box>
                </MenuItem>
              </NavLink>
              <MenuDivider />
              {/* About us */}
              <MenuItem>
                <Box
                  display={"flex"}
                  gap={"1rem"}
                  fontSize={"1.1rem"}
                  alignItems={"center"}
                >
                  <Text fontSize={"1.2rem"}>
                    <i className="fa-regular fa-circle-question"></i>
                  </Text>
                  <Text>About us</Text>
                </Box>
              </MenuItem>
              <MenuDivider />
              {user && (
                <MenuItem onClick={logoutUser}>
                  <Box
                    display={"flex"}
                    gap={"1rem"}
                    fontSize={"1.1rem"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"1.2rem"}>
                      <i
                        className="fa-solid fa-arrow-right-from-bracket"
                        style={{ fontWeight: "600" }}
                      ></i>
                    </Text>
                    <Text>Logout</Text>
                  </Box>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
