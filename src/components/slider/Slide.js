import React from 'react';

export const Slide = ({url, title, prev, active, next}) => {
    return (
        <div
            className={"slide" + (active ? " active-slide" : (prev ? " prev-slide" : (next ? " next-slide" : ''))) }
            style={{backgroundImage: `url(${url})`}}
        >
            <div className="slide-title">
                <span>
                    {title}
                </span>
            </div>
        </div>
    )
};
