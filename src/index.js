import React from "react";
import ReactDOM from "react-dom";
// import setupMockServer from "./api/mock.server";
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router} from "react-router-dom"
import App from "./App";
import { CartProvider } from "../src/context/cartContext";

// setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <CartProvider>
     <App />
    </CartProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);


