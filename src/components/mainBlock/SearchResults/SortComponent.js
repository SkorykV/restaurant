import React from 'react';
import PropTypes from 'prop-types';


export const SortComponent = ({options=[], selected=0, onChange=f=>f}) => {
    return (
        <div className="sort-filter">
            <ul>
                {
                    options.map(
                        (option, i) => (
                            <li key={option.value} className={selected === i ? "selected" : null} onClick={() => onChange(option.value)}>
                                {option.label}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
};

SortComponent.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })),
    selected: PropTypes.number,
    onChange: PropTypes.func,
};
