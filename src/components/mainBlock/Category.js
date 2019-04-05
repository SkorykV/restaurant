import React, {Component} from 'react'
import { Link } from "react-router-dom";

import {LocalRequestsSender} from "../../requestsSenders";
import {Pagination} from "../pagination";
import { simpleSearchParamsParse } from '../../lib';
import { uiC } from "../../constants";

export class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: null,
            totalPages: null,
            dishes: [],
            isLoading: false,
            error: null,
        }
    }

    fetchData() {
        this.setState({isLoading: true});

        const params = simpleSearchParamsParse(this.props.location.search);
        let currentPage = 1;

        if('page' in params) {
            const n = +params['page'];
            currentPage = Number.isFinite(n) ? n : currentPage;
        }

        const categoryId = this.props.match.params.categoryId;
        LocalRequestsSender.getCategoryDishesRequest('myFirstRestaurant', categoryId, currentPage).then(
            data => {

                this.setState({
                    currentPage,
                    totalPages: data.totalPages,
                    dishes: data.dishes,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
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
        const categoryId = this.props.match.params.categoryId;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, категорія меню завантажується</h2>
        }
        if(this.state.dishes === null){
            return <h2>Вибачте, але в нас поки що відсутня дана категорія</h2>
        }
        if(!this.state.dishes.length){
            if(this.state.totalPages === 0) {
                return <h2>Вибачте, але в даній категорії поки що немає страв</h2>
            }
            return <h2>Вибачте, але в даній категорії замало страв</h2>
        }
        //TODO: check for better way of dynamic import
        return <div className="category">
            <div className="category-content">
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
            <div className="category-pagination">
                <Pagination
                    currentPage={this.state.currentPage}
                    displayAround={uiC.pagination.pagesAround}
                    countPages={this.state.totalPages}
                />
            </div>

        </div>
    }
}