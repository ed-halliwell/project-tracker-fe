import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BoardGridPage from "./components/BoardGridPage";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import BoardMainPage from "./components/BoardMainPage";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NotFound />} />
            <Route path="" element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />

            <Route path="boards">
              <Route index element={<BoardGridPage />} />
              <Route path=":board_id" element={<BoardMainPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
