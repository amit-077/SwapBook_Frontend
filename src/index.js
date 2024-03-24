import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/ContextAPI";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
