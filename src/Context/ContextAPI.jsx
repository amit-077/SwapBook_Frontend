import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import url from "../constant";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books, setBooks] = useState([]);
  const [backupBooks, setBackupBooks] = useState([]);
  const [cart, setCart] = useState([]);

  const getCart = async (userData) => {
    try {
      let userId = userData._id;
      let cartDetails = await axios.post(`${url}/getCart`, { userId });
      setCart(cartDetails.data);
      console.log(cartDetails.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("SwapBook"));
    setUser(userData);
    getCart(userData);
  }, []);

  const updateLocation = async () => {
    console.log("Update location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        const data = await axios.post(
          `${url}/updateLocation`,
          {
            latitude,
            longitude,
          },
          { withCredentials: true }
        );

        console.log(data);
      });
    }
  };

  useEffect(() => {
    console.log(user);
    updateLocation();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isOpen,
        onClose,
        onOpen,
        books,
        setBooks,
        setBackupBooks,
        backupBooks,
        cart,
        setCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
