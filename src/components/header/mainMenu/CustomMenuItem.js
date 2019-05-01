import React from 'react'
import PropTypes from "prop-types";

export const CustomMenuItem = ({active=false, onClick= f=>f, children}) => {
    const handleClick = (event) => {
        onClick();
        event.preventDefault();
    };

    return <li>
        <a className={active ? "selectedMenuItem" : null} onClick={handleClick}>{children}</a>
    </li>
};

CustomMenuItem.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
