import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import favicon from "./image.png";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// ✅ Create Redux Store
const store = configureStore({
  reducer: rootReducer,
});

// ✅ Set favicon
(function setFavicon(href) {
  try {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
  } catch (e) {}
})(favicon);

// ✅ Render App
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);