import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import "./index.css";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 최상위 root
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
);
