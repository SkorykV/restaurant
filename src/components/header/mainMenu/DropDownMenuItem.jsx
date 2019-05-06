import React from 'react'

export const DropDownMenuItem = ({active, text, children}) => {
    return <li className={active ? "activeMenuItem" : null}>
        <input type="checkbox" id={text} />
        <label htmlFor={text}>{text}</label>
        <ul className="sub-menu">
            {children}
        </ul>
    </li>
};
