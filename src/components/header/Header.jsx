import React from 'react'

import Logo from '../../images/logo.png';

import { Menu } from './mainMenu'

export const Header = ({companyName}) => {
    return <header>
        <div className="left-header">
            <img src={Logo} alt="logo" className="logo" />
            <h1 className="company-name">
                {companyName}
            </h1>
        </div>
        <Menu />
    </header>
};