import React from 'react'
import { NavLink } from "react-router-dom";

export const DefaultMenuItem = ({text, link}) => {
    return <li>
        <NavLink to={link} activeClassName="selectedMenuItem">{text}</NavLink>
    </li>
};

