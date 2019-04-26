import React, { Component } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'

import { Header } from './header'
import {
    Dish,
    Category,
    AboutUs,
    Events,
} from "./mainBlock";

import {
    Reservation
} from './mainBlock/ReservationPage'

import {
    SearchResults
} from "./mainBlock/SearchResults";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static dishGenerator(props) {
        return <Dish {...props} key={props.match.params.dishId}/>
    }

    render() {
        return <div>
            <Header companyName={'Смачно'} />
            <section className="main-block">
                <Switch>
                    <Route path="/about" component={AboutUs} />
                    <Route path="/reservation" component={Reservation} />
                    <Route path="/events" component={Events} />
                    <Route path="/search" component={SearchResults} />
                    <Route exact path="/category/:categoryId" component={Category} />
                    <Route exact path="/category/:categoryId/dish/:dishId" render={App.dishGenerator} />
                </Switch>
            </section>
        </div>
    }
}