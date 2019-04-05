import React, {Component} from 'react'


import Logo from '../../images/logo.png';

import { Menu } from './mainMenu'
import {SearchField} from "./SearchField";

export class Header extends Component {
    constructor(props){
        super(props);

        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
        this.handleSearchFieldSubmit = this.handleSearchFieldSubmit.bind(this);

        this.state = {
            value: '',
        };
    }

    handleSearchFieldChange(event) {
        this.setState({value: event.target.value});
    }

    handleSearchFieldSubmit(event) {
        console.log('search value', this.state.value);
        this.setState({value: ''});
        event.preventDefault();
    }

    render() {
        const { companyName } = this.props;
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
                <SearchField value={this.state.value} onChange={this.handleSearchFieldChange} onSubmit={this.handleSearchFieldSubmit}/>
            </div>
            <Menu />
        </header>
    }
};
