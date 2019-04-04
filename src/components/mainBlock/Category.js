import React, {Component} from 'react'
import { Link } from "react-router-dom";

import {LocalRequestsSender} from "../../requestsSenders";

export class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const categoryId = this.props.match.params.categoryId;
        LocalRequestsSender.getCategoryDishesRequest('myFirstRestaurant', categoryId).then(
            data => {

                this.setState({
                    dishes: data,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
        );
    }

    render() {
        const categoryId = this.props.match.params.categoryId;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, категорія меню завантажується</h2>
        }
        if(!this.state.dishes){
            return <h2>Вибачте, але в даній категорії поки що не має страв</h2>
        }
        //TODO: check for better way of dynamic import
        return <div className="category container">
            {
                this.state.dishes.map(
                    dish =>
                        <div className="dishOverview" key={dish.id}>
                            <Link to={`/category/${categoryId}/dish/${dish.id}`}>
                                <img className="dish-img" src={require(`../../images/menu/dishes/${dish.image}`)} alt={dish.title}/>
                                <h3 className="dish-title">
                                    {dish.title}
                                </h3>
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
                            </Link>


                        </div>
                )
            }
        </div>
    }
}