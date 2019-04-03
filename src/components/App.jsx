import React, { Component } from 'react'
import {
    Route,
} from 'react-router-dom'

import { Header } from './header'
import {
    Category,
    AboutUs,
    Events,
    Reservation
} from "./mainBlock";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return <div>
            <Header companyName={'Смачно'} />
            <Route path="/category/:categoryId" component={Category} />
            <Route path="/about" component={AboutUs} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/events" component={Events} />
        </div>
    }
}