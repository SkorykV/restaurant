import React, {Component} from 'react'

import { LocalRequestsSender } from "../../requestsSenders";
import { uiC } from "../../constants";

import Logo from '../../images/logo.png';

import { Menu } from './mainMenu'
import {SearchField} from "./SearchField";

export class Header extends Component {
    constructor(props){
        super(props);

        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
        this.handleSearchFieldSubmit = this.handleSearchFieldSubmit.bind(this);

        this.state = {
            searchValue: '',
        };
    }

    handleSearchFieldChange(value) {
        this.setState({ searchValue: value });
    }

    handleSearchFieldSubmit(event) {
        LocalRequestsSender.getDishesByQueryRequest('myFirstRestaurant', this.state.searchValue).then(
            data => console.log(data)
        );

        const oldHistory = JSON.parse(localStorage.getItem('searchHistory'));

        const history = oldHistory  === null ?
            [] :
            [...oldHistory];
        if(!history.includes(this.state.searchValue)) {
            history.push(this.state.searchValue);
            if(history.length > uiC.search.historyLength) {
                history.shift();
            }
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
        this.setState({ searchValue: '' });
        event.preventDefault();
    }

    render() {
        const { companyName } = this.props;
        const history = JSON.parse(localStorage.getItem('searchHistory')).filter(
            s => s.includes(this.state.searchValue)
        );
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
                    value={this.state.searchValue}
                    history={history === null ? [] : history}
                    placeholder={"Назва страви"}
                    onChange={this.handleSearchFieldChange}
                    onSubmit={this.handleSearchFieldSubmit}
                />
            </div>
            <Menu />
        </header>
    }
}
