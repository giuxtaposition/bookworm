import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LibraryContextProvider } from "./context/index";

ReactDOM.render(
  <LibraryContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LibraryContextProvider>,
  document.getElementById("root")
);
