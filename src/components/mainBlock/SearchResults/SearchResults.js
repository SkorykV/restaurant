import React, {Component} from 'react';

import {LocalRequestsSender} from "../../../requestsSenders";

import {FilterForm, FiltersForm} from "./FiltersForm";
import {Pagination} from "../../pagination";
import { simpleSearchParamsParse } from '../../../lib';
import { uiC } from "../../../constants";
import {DishOverview} from "../DishOverview";

export class SearchResults extends Component {

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

        const requestParams = {
            query: params.query,
            page: currentPage,
            onPage: uiC.pagination.onPage,
        };

        LocalRequestsSender.getDishesByParamsRequest('myFirstRestaurant', requestParams).then(
            data => {

                this.setState({
                    currentPage,
                    totalPages: data.totalPages,
                    dishes: data.content.dishes,
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


        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, результати пошуку завантажуються</h2>
        }
        if(this.state.error){
            return <h2>Вибачте, щось пішло не так</h2>
        }
        if(!this.state.dishes.length){
            if(this.state.totalPages === 0) {
                return <h2>Вибачте, але за вашим запитом нічого не знайдено</h2>
            }
            return <h2>Вибачте, але результатів пошуку замало</h2>
        }
        return (
            <div className="clearfix">
                <div className="search-results">
                    <div className="search-results-content">
                        {
                            this.state.dishes.map(
                                _ => (
                                    <DishOverview categoryId={_.categoryId} dish={_.dish} key={_.dish.id} />
                                )
                            )
                        }
                    </div>
                    <div className="search-results-pagination">
                        <Pagination
                            currentPage={this.state.currentPage}
                            displayAround={uiC.pagination.pagesAround}
                            countPages={this.state.totalPages}
                        />
                    </div>
                </div>
                <div className="search-filters">
                    <FiltersForm />
                </div>
            </div>
        )
    }
}