import React from 'react'
import { NavLink } from "react-router-dom";

export const DefaultMenuItem = ({link, children}) => {
    return <li>
        <NavLink to={link} activeClassName="selectedMenuItem">{children}</NavLink>
    </li>
};

