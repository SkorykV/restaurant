import React, {Component} from 'react'

import {LocalRequestsSender} from "../../requestsSenders";

export class Dish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dish: null,
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const { categoryId, dishId } = this.props.match.params;
        LocalRequestsSender.getDishRequest('myFirstRestaurant', categoryId, dishId).then(
            data => {

                this.setState({
                    dish: data,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
        );
    }

    render() {
        const dish = this.state.dish;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, інформація про страву завантажується</h2>
        }
        if(!this.state.dish){
            return <h2>Вибачте, інформація про дану страву не знайдена.</h2>
        }

        return <div className="dish">
            <div className="dish-img">
                <img src={require(`../../images/menu/dishes/${dish.image}`)} alt={dish.title} />
            </div>
            <div className="dish-info">
                <h2>{dish.title}</h2>
                {
                    dish.description.split('\n').map(
                        (paragraph,i) =>
                            <p className="dish-description" key={i}>
                                { paragraph }
                            </p>
                    )
                }
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
    }
}