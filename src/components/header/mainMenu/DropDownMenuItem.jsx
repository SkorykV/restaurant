import React from 'react'
import { DefaultMenuItem } from "./DefaultMenuItem.jsx";

export const DropDownMenuItem = ({active, text, items}) => {
    return <li className={active ? "activeMenuItem" : null}>
        <span>{text}</span>
        <ul className="sub-menu">
            {
                items.map(
                    item => <DefaultMenuItem {...item.data} key={item.key} />
                )
            }
        </ul>
    </li>
};