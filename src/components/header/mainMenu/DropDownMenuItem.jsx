import React from 'react'

export const DropDownMenuItem = ({active, text, children}) => {
    return <li className={active ? "activeMenuItem" : null}>
        <span>{text}</span>
        <ul className="sub-menu">
            {children}
        </ul>
    </li>
};
