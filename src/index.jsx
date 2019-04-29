import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './styles/main.scss';

import { InnerDatabase } from "./databases/InnerDatabase";
import { App } from './components'

InnerDatabase.initialize();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
