import React, {Component} from 'react';

import {LocalRequestsSender} from "../../../requestsSenders";

import {FilterForm, FiltersForm} from "./FiltersForm";
import {Pagination} from "../../pagination";
import {createSearchStrFromObj, simpleSearchParamsParse} from '../../../lib';
import { uiC } from "../../../constants";
import {DishOverview} from "../DishOverview";
import {SortComponent} from "./SortComponent";
import {servicesC} from "../../../constants/services";

export class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: null,
            totalPages: null,
            results: [],
            filters: null,
            isLoadingContent: false,
            isLoadingFilters: false,
            error: null,
        };

        this.updateSearchParams = this.updateSearchParams.bind(this);
        this.handleFiltersFormSubmit = this.handleFiltersFormSubmit.bind(this);
        this.handleSortParamChange = this.handleSortParamChange.bind(this);
    }

    fetchData(params, getFilters=true) {
        this.setState({isLoadingContent: true, isLoadingFilters: getFilters});

        let currentPage = 1;

        if('page' in params) {
            const n = +params['page'];
            currentPage = Number.isFinite(n) ? n : currentPage;
        }

        //get filters from search params
        const filters = {};
        let minPrice = -Infinity, maxPrice = Infinity;
        if('minPrice' in params) {
            const n = +params['minPrice'];
            minPrice = Number.isFinite(n) ? n : -Infinity;
        }
        if('maxPrice' in params) {
            const n = +params['maxPrice'];
            maxPrice = Number.isFinite(n) ? n : Infinity;
        }
        if(minPrice !== -Infinity || maxPrice !== Infinity) {
            filters.price = {from: minPrice, to: maxPrice}
        }

        let minWeight = -Infinity, maxWeight = Infinity;
        if('minWeight' in params) {
            const n = +params['minWeight'];
            minWeight = Number.isFinite(n) ? n : -Infinity;
        }
        if('maxWeight' in params) {
            const n = +params['maxWeight'];
            maxWeight = Number.isFinite(n) ? n : Infinity;
        }
        if(minWeight !== -Infinity || maxWeight !== Infinity) {
            filters.weight = {from: minWeight, to: maxWeight}
        }

        if('categories' in params) {
            filters.categories = params.categories;
        }

        //get sort param from search params
        this.selectedSort = servicesC.defaultSortOption;
        if(params.sort) {
            const requestedSort = servicesC.sortOptions.findIndex(option => option.value === params.sort);
            if(requestedSort !== -1) {
                this.selectedSort = requestedSort;
            }
        }

        const requestParams = {
            query: params.query,
            filters,
            sort: servicesC.sortOptions[this.selectedSort].value,
        };

        const responseParams = {
            getFilters,
            page: currentPage,
            onPage: uiC.pagination.onPage,
        };

        LocalRequestsSender.getDishesByParamsRequest('myFirstRestaurant', requestParams, responseParams).then(
            content => {

                this.setState({
                    currentPage,
                    isLoadingContent: false,
                    isLoadingFilters: false,
                    ...content,
                })
            },
            error => { this.setState({isLoadingContent: false, isLoadingFilters: false, error: error.message })}
        );

    }

    componentDidMount() {
        const params = simpleSearchParamsParse(this.props.location.search);
        this.fetchData(params);
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            const prevParams = simpleSearchParamsParse(prevProps.location.search);
            const params = simpleSearchParamsParse(this.props.location.search);
            const getFilters = !!((prevParams.query || params.query) && (prevParams.query !== params.query));
            this.fetchData(params, getFilters);
        }
    }

    updateSearchParams({filters=null, sort=null} = {filters: null, sort: null}) {
        let searchParams;

        const newLocation = Object.assign({}, this.props.location);

        const prevParams = simpleSearchParamsParse(this.props.location.search);

        if(filters !== null) {
            searchParams = {
                query: prevParams.query ? prevParams.query : '',
                ...filters,
            }
        }
        else {
            searchParams = {...prevParams};
        }

        if(sort !== null) {
            searchParams.sort = sort;
        }
        else if(prevParams.sort) {
            searchParams.sort = prevParams.sort;
        }

        //always show 1 page when params change
        delete searchParams.page;

        newLocation.search = createSearchStrFromObj(searchParams);

        this.props.history.push(newLocation);
    }

    handleFiltersFormSubmit(filtersParams) {
        this.updateSearchParams({filters: filtersParams});
    }

    handleSortParamChange(sortValue) {
        this.updateSearchParams({sort: sortValue})
    }

    render() {
        if(this.state.error){
            return <h2>{this.state.error}</h2>
        }

        let content;

        if(this.state.isLoadingContent) {
            content = <h2>Почекайте, будь ласка, результати пошуку завантажуються</h2>
        }
        else if(!this.state.results.length){
            if(this.state.totalPages === 0) {
                content = <h2>Вибачте, але за вашим запитом нічого не знайдено</h2>
            }
            else {
                content = <h2>Вибачте, але результатів пошуку замало</h2>
            }
        }
        else {
            content = (
                <div>
                    <div className="search-results-content">
                        {
                            this.state.results.map(
                                _ => (
                                    <DishOverview categoryId={_.categoryId} dish={_.dish} key={_.categoryId + '/' + _.dish.id} />
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
            )
        }
        let filters;
        if(!this.state.isLoadingFilters && this.state.filters) {
            filters = (
                <div className="search-filters">
                    <h3 className="filters-title">Наявні фільтри</h3>
                    <FiltersForm
                        price={this.state.filters.price}
                        weight={this.state.filters.weight}
                        categories={this.state.filters.categories}
                        disabled={this.state.isLoadingContent}
                        onSubmit={this.handleFiltersFormSubmit}
                    />
                </div>
            )
        }

        return (
            <div className="search-page">
                <div className="search-results">
                    { content }
                </div>
                <div className="search-params">
                    { filters }
                    {
                        this.state.filters &&
                        <div className="search-sort">
                            <h3 className="filters-title">Сортування</h3>
                            <SortComponent
                                options={servicesC.sortOptions}
                                selected={this.selectedSort}
                                onChange={this.handleSortParamChange}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}
