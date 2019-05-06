import React, { Component } from 'react';

import PropTypes from "prop-types";

import {CheckboxWithCount, RangeFilter} from "../../filters";
import {validateFloat, validateInt} from "../../../lib";

export class FiltersForm extends Component {

    static initCategoriesCheckboxList(categories) {
        const state = {};
        if(!categories) {
            return null;
        }
        for(const categoryId in categories) {
            state[categoryId] = false;
        }
        return state;
    }

    constructor(props) {
        super(props);

        this.state = {
            price: null,
            weight: null,
            categories: FiltersForm.initCategoriesCheckboxList(this.props.categories)
        };

        this.priceConverter = input => Math.floor(input * 100) / 100;
        this.weightConverter = input => Math.floor(input);
        this.handlePriceRangeChange = this.getRangeChangeHandler('price').bind(this);
        this.handleWeightRangeChange = this.getRangeChangeHandler('weight').bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            const update = {};
            if(this.props.price.from !== prevProps.price.from || this.props.price.to !== prevProps.price.to) {
                update.price = null;
            }
            if(this.props.weight.from !== prevProps.weight.from || this.props.weight.to !== prevProps.weight.to) {
                update.weight = null;
            }
            if(this.props.categories !== prevProps.categories) {
                if(this.props.categories !== null){
                    update.categories = FiltersForm.initCategoriesCheckboxList(this.props.categories)
                }
                else {
                    update.categories = undefined
                }
            }
            this.setState(update);
        }
    }

    getRangeChangeHandler(name) {
        return (newRange) => {
            this.setState({
                [name]: newRange,
            })
        }
    }

    handleCheckboxClick(id) {
        this.setState({
            categories: {
                ...this.state.categories,
                [id]: !this.state.categories[id]
            }
        })
    }

    handleSubmit(event) {
        if(!this.props.disabled) {
            const params = {};

            if(this.state.price) {
                if(this.state.price.from !== this.props.price.from) {
                    params.minPrice = this.state.price.from;
                }
                if(this.state.price.to !== this.props.price.to) {
                    params.maxPrice = this.state.price.to;
                }
            }
            if(this.state.weight) {
                if(this.state.weight.from !== this.props.weight.from) {
                    params.minWeight = this.state.weight.from;
                }
                if(this.state.weight.to !== this.props.weight.to) {
                    params.maxWeight = this.state.weight.to;
                }
            }
            if(this.state.categories) {
                params.categories = [];
                for(const categoryId in this.state.categories) {
                    if(this.state.categories[categoryId]) {
                        params.categories.push(categoryId);
                    }
                }
            }

            this.props.onSubmit(params);
        }

        event.preventDefault();
    }

    render() {
        let checkboxes = [];
        if(this.state.categories) {
            for(const categoryId in this.props.categories) {
                checkboxes.push(
                    <CheckboxWithCount
                        key={`${categoryId}Checkbox`}
                        name={categoryId}
                        label={this.props.categories[categoryId].title}
                        count={this.props.categories[categoryId].count}
                        checked={this.state.categories[categoryId]}
                        onChange={() => this.handleCheckboxClick(categoryId)}
                    />
                );
            }
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <RangeFilter
                    key="price"
                    range={this.state.price}
                    boundaries={{min: this.props.price.from, max: this.props.price.to}}
                    title="Ціна (грн)"
                    onChangeRange={this.handlePriceRangeChange}
                    inputValidator={validateFloat}
                    valueConverter={this.priceConverter}
                />
                <RangeFilter
                    key="weight"
                    range={this.state.weight}
                    boundaries={{min: this.props.weight.from, max: this.props.weight.to}}
                    title="Вага (г)"
                    onChangeRange={this.handleWeightRangeChange}
                    inputValidator={validateInt}
                    valueConverter={this.weightConverter}
                />
                { checkboxes }
                <button type="submit" className="btn btn-submit" disabled={this.props.disabled}>Застосувати</button>
            </form>
        )
    }
}

FiltersForm.propTypes = {
    price: PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
    }).isRequired,
    weight: PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
    }).isRequired,
    categories: PropTypes.object,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
};

FiltersForm.defaultProps = {
    categories: null,
    disabled: false,
    onSubmit: f=>f,
};
