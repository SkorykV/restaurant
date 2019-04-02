import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/main.scss';

import { InnerDatabase } from "./databases/InnerDatabase";
import { LocalRequestsSender } from "./requestsSenders";

InnerDatabase.initialize();

LocalRequestsSender
    .getDishRequest('myFirstRestaurant', 'soupCategory', 'harcho')
    .then((soup) => console.log(soup));

ReactDOM.render(
    <div>HELLO WORLD</div>,
    document.getElementById('root')
);