import React, { Component } from 'react'
import {
    Route,
    Switch,
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

    static categoryGenerator(props) {
        return <Category {...props} key={props.match.params.categoryId}/>
    }

    render() {
        return <div>
            <Header companyName={'Смачно'} />
            <section className="main-block">
                <Switch>
                    <Route path="/about" component={AboutUs} />
                    <Route path="/reservation" component={Reservation} />
                    <Route path="/events" component={Events} />
                    <Route path="/category/:categoryId" render={App.categoryGenerator} />
                </Switch>
            </section>
        </div>
    }
}