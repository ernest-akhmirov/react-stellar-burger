import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./services/reducers/rootReducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {BrowserRouter} from 'react-router-dom';
import {socketMiddleware} from "./services/WSMiddleware";
import {wsActions} from "./services/actions/WSActions";

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);


reportWebVitals();
