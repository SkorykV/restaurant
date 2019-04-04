import React from 'react'

import Logo from '../../images/logo.png';

import { Menu } from './mainMenu'

export const Header = ({companyName}) => {
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
        </div>
        <Menu />
    </header>
};