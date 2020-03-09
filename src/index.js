import React from "react";
import ReactDOM from "react-dom";
import GeneralSorting from "./sorting/GeneralSorting"
import "./index.css";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<GeneralSorting name="Welcome to Sorting application!"/>, document.getElementsByTagName("root")[0]);
serviceWorker.unregister();
