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


    fetchData() {
        this.setState({isLoading: true});
        const { categoryId, dishId } = this.props.match.params;
        LocalRequestsSender.getDishRequest('myFirstRestaurant', categoryId, dishId).then(
            data => {

                this.setState({
                    dish: data.dish,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error: error.message })}
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.fetchData();
        }
    }

    render() {
        const dish = this.state.dish;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, інформація про страву завантажується</h2>
        }
        if(this.state.error) {
            return <h2>{this.state.error}</h2>
        }
        if(!this.state.dish){
            return <div />
        }

        return <div className="item-page breakable">
            <div className="img-col img-col-lg">
                <img src={require(`../../images/menu/dishes/${dish.image}`)} alt={dish.title} />
            </div>
            <div className="content-col content-col-lg content-col-padding">
                <h2 className="title">{dish.title}</h2>
                {
                    dish.description.split('\n').map(
                        (paragraph,i) =>
                            <p className="item-description" key={i}>
                                { paragraph }
                            </p>
                    )
                }
                <div className="additional-params">
                    <div className="dish-weight">
                        <span>
                            {`${dish.weight} г`}
                        </span>
                    </div>
                    <div className="dish-price">
                        <span>
                            {`${dish.price} грн`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }
}
