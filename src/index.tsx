import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/app.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const store = setupStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
