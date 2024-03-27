import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import url from "../constant";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("SwapBook"));
    setUser(userData);
  }, []);

  const updateLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const data = await axios.post(`${url}/updateLocation`, {
          latitude,
          longitude,
        });

        console.log(data);
      });
    }
  };

  useEffect(() => {
    user && updateLocation();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isOpen, onClose, onOpen }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
