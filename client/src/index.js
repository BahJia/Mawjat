import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./MainApp";
import "./index.scss";

import { Provider } from "react-redux";
import { store } from "./store";
import { initContract } from "./utils";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>
);
initContract().then(() => {
  console.log("é");
});
