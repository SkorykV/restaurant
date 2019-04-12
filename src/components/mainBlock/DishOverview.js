import React from 'react'
import {Link} from "react-router-dom";

//TODO: check for better way of dynamic import
export const DishOverview = ({categoryId, dish}) => {
    return (
        <div className="dishOverview">
            <Link to={`/category/${categoryId}/dish/${dish.id}`}>
                <img className="dish-img" src={require(`../../images/menu/dishes/${dish.image}`)} alt={dish.title}/>
                <div className="dish-params">
                    <h3 className="dish-title">
                        {dish.title}
                    </h3>
                    <div className="additional-params">
                        <div className="dish-weight">
                            <span>
                                {dish.weight}
                            </span>
                        </div>
                        <div className="dish-price">
                            <span>
                                {`${dish.price} грн`}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
};