import React, {Component} from 'react'
import { withRouter } from "react-router";

import { uiC } from "../../constants";

import Logo from '../../images/logo.png';

import { Menu } from './mainMenu'
import {SearchField} from "./SearchField";
import {createSearchStrFromObj} from "../../lib";

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSearchFieldSubmit = this.handleSearchFieldSubmit.bind(this);
    }

    handleSearchFieldSubmit(value) {

        const oldHistory = JSON.parse(localStorage.getItem('searchHistory'));

        const history = oldHistory  === null ?
            [] :
            [...oldHistory];
        const searchValue = value.trim();
        if(searchValue && !history.includes(searchValue)) {
            history.push(searchValue);
            if(history.length > uiC.search.historyLength) {
                history.shift();
            }
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
        const searchParams = {
            query: searchValue,
        };
        this.props.history.push(`/search${createSearchStrFromObj(searchParams)}`)
    }

    render() {
        const { companyName } = this.props;
        const history = JSON.parse(localStorage.getItem('searchHistory'));
        return <header className="clearfix">
            <div className="left-header">
                <div className="logo">
                    <img src={Logo} alt="logo"  />
                </div>
                <div className="company-name">
                    <h1>
                        {companyName}
                    </h1>
                </div>
                <SearchField
                    history={history === null ? [] : history}
                    placeholder={"Назва страви"}
                    onSubmit={this.handleSearchFieldSubmit}
                />
            </div>
            <Menu
                onLoginModalOpen={this.props.onLoginModalOpen}
                onLogout={this.props.onLogout}
                onRegistrationModalOpen={this.props.onRegistrationModalOpen}
                user={this.props.user}
            />
        </header>
    }
}

export const Header = withRouter(HeaderComponent);
