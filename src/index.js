import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import favicon from "./image.png";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";


const store = configureStore({
  reducer:rootReducer,
});
const BASE_URL = process.env.REACT_APP_BASE_URL;

fetch(`${BASE_URL}/api/course`);
const root = ReactDOM.createRoot(document.getElementById("root"));
// set favicon from bundled asset
(function setFavicon(href) {
  try {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = href;
  } catch (e) {
    // fail silently if DOM isn't ready
  }
})(favicon);
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
  </Provider>
    
    
  </React.StrictMode>
);
