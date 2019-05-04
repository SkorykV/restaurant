import React from 'react';

export const Slide = ({url, title, prev, active, next, visible, onClick}) => {

    return (
        <div
            className={"slide" +
            (active ? " active-slide" : (prev ? " prev-slide" : (next ? " next-slide" : ''))) +
            (visible ? " visible" : "")
            }
            style={{backgroundImage: `url(${url})`}}
            onClick={onClick}
        >
            <div className="slide-title">
                <span>
                    {title}
                </span>
            </div>
        </div>
    )
};

