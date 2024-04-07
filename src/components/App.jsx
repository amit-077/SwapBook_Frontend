import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import SellBook from "./SellBook";
import BuyBook from "./BuyBook";
import Wishlist from "./Wishlist";
import MyBooks from "./MyBooks";
import Book from "./Book";

const App = () => {
  return (
    <Box bgColor={"#f5f5f5"} w={"100vw"} minH={"100vh"}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/sell-book"
          element={
            <>
              <Navbar />
              <SellBook />
            </>
          }
        />
        <Route
          path="/buy-book"
          element={
            <>
              <Navbar />
              <BuyBook />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <Navbar />
              <Wishlist />
            </>
          }
        />
        <Route
          path="/my-books"
          element={
            <>
              <Navbar />
              <MyBooks />
            </>
          }
        />
        <Route
          path="/book/:bookId"
          element={
            <>
              <Navbar />
              <Book />
            </>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
