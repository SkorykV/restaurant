import React, { Component } from 'react'

import {Redirect, withRouter} from "react-router";
import {
    Route,
    Switch,
} from 'react-router-dom'

import { Header } from './header'
import {
    Dish,
    Category,
    Contacts,
    Events,
    Event,
    MainPageSlider, MainPageContent,
} from "./mainBlock";

import {
    Reservation
} from './mainBlock/ReservationPage'

import {
    SearchResults
} from "./mainBlock/SearchResults";
import {LoginForm, RegistrationForm} from "./mainBlock/userAuthentication";

class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalShow: false,
            registrationModalShow: false,
            user: JSON.parse(localStorage.getItem('user')) || null,
        };
        this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
        this.handleLoginModalClose = this.handleLoginModalClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.handleLogout = this.handleLogout.bind(this);

        this.handleRegistrationModalClose = this.handleRegistrationModalClose.bind(this);
        this.handleRegistrationModalOpen = this.handleRegistrationModalOpen.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        const {location, history: {action}} = nextProps;
        if (location.pathname !== this.props.location.pathname && action === 'PUSH') {
            // new navigation - scroll to top
            window.scrollTo(0, 0);
        }
    }

    handleLoginModalOpen() {
        this.setState({
            loginModalShow: true,
        })
    }

    handleLoginModalClose() {
        this.setState({
            loginModalShow: false,
        })
    }

    handleLogin(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({
            loginModalShow: false,
            user: user
        })
    }

    handleLogout() {
        if(this.state.user) {
            localStorage.removeItem('user');
            this.setState({user: null});
            this.props.history.push('/');
        }
    }

    handleRegistrationModalOpen() {
        this.setState({
            registrationModalShow: true,
        })
    }

    handleRegistrationModalClose() {
        this.setState({
            registrationModalShow: false,
        })
    }

    render() {
        return <div>
            <Header
                companyName={'Saperavi'}
                onLoginModalOpen={this.handleLoginModalOpen}
                onLogout={this.handleLogout}
                onRegistrationModalOpen={this.handleRegistrationModalOpen}
                user={this.state.user}
            />
            <LoginForm
                show={this.state.loginModalShow}
                onClose={this.handleLoginModalClose}
                onLogin={this.handleLogin}
            />
            <RegistrationForm
                show={this.state.registrationModalShow}
                onClose={this.handleRegistrationModalClose}
            />

            <main>
                <Route path="/" exact component={MainPageSlider} />
                <section className="main-block">
                    <Switch>
                        <Route exact path="/" component={MainPageContent}/>
                        <Route exact path="/contacts" component={Contacts} />
                        <Route exact path="/reservation" render={
                            (routeProps) => (
                                <Reservation {...routeProps} user={this.state.user} onLoginModalOpen={this.handleLoginModalOpen} />
                            )
                        }
                        />
                        <Route exact path="/events" component={Events} />
                        <Route exact path="/events/:eventId" component={Event} />
                        <Route exact path="/search" component={SearchResults} />
                        <Route exact path="/category/:categoryId" component={Category} />
                        <Route exact path="/category/:categoryId/dish/:dishId" component={Dish} />
                        <Redirect to="/"/>
                    </Switch>
                </section>
            </main>
        </div>
    }
}

export const App = withRouter(MyApp);
