import React, {Component} from 'react';

import {LocalRequestsSender} from "../../requestsSenders";
import {Pagination} from "../pagination";
import { simpleSearchParamsParse } from '../../lib';
import { uiC } from "../../constants";
import {Card} from "../cards";

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
        LocalRequestsSender.getCategoryDishesRequest('myFirstRestaurant', categoryId, currentPage, uiC.pagination.onPage).then(
            data => {

                this.setState({
                    currentPage,
                    totalPages: data.totalPages,
                    dishes: data.dishes,
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
        const categoryId = this.props.match.params.categoryId;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, категорія меню завантажується</h2>
        }
        if(this.state.error){
            return <h2>{this.state.error}</h2>
        }
        if(!this.state.dishes.length){
            if(this.state.totalPages === 0) {
                return <h2>Вибачте, але в даній категорії поки що немає страв</h2>
            }
            return <h2>Вибачте, але в даній категорії замало страв</h2>
        }
        return <div className="category">
            <div className="cards-container category-content">
                {
                    this.state.dishes.map(
                        dish =>{
                            return (
                                    <Card
                                        image={require(`../../images/menu/dishes/${dish.image}`)}
                                        title={dish.title}
                                        link={`/category/${categoryId}/dish/${dish.id}`}
                                        key={dish.id}
                                    >
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
                                    </Card>
                                )
                        }

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
