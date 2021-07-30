import React from "react";
import ReactDOM from "react-dom";
// import setupMockServer from "./api/mock.server";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CartProvider } from "../src/context/cartContext";
import { AuthProvider } from "./context/authContext";

// setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
