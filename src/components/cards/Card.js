import React from 'react'
import {Link} from "react-router-dom";


export const Card = ({image='', title='Title', link='/', children}) => {
    return (
        <div className="card">
            <div className="image-box" style={{backgroundImage: `url(${image})`}}>
            </div>
            <div className="card-content">
                <h4 className="card-title">{title}</h4>
                <div className="card-body">
                    { children }
                </div>
                <div className="card-footer">
                    <Link to={link} className="card-details">Детальніше</Link>
                </div>
            </div>
        </div>
    )
};
