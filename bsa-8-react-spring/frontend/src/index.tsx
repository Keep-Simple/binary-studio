import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import "./containers/Chat/styles.css";
import {Provider} from "react-redux";
import configureStore from "./redux/store";
import App from "./containers/App";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
