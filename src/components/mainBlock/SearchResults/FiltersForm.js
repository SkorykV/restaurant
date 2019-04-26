import React, { Component } from 'react';
import {RangeFilter} from "../../filters";
import {validateFloat} from "../../../lib";

export class FiltersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: {
                leftValue: '0',
                rightValue: '100',
            }
        };

        this.onChangePriceLeftValue = this.onChangePriceLeftValue.bind(this);
        this.onChangePriceRightValue = this.onChangePriceRightValue.bind(this);
    }

    onChangePriceLeftValue(newValue) {
        if(!validateFloat(newValue, 2)) {
            return
        }
        this.setState({
            price: {
                leftValue: newValue,
                rightValue: this.state.price.rightValue,
            }
        })
    }

    onChangePriceRightValue(newValue) {
        if(!validateFloat(newValue, 2)) {
            return
        }

        this.setState({
            price: {
                leftValue: this.state.price.leftValue,
                rightValue: newValue,
            }
        })
    }

    render() {
        return (
            <form>
                <RangeFilter
                    leftValue={this.state.price.leftValue}
                    rightValue={this.state.price.rightValue}
                    leftBoundary={0}
                    rightBoundary={100}
                    title="Ціна"
                    onChangeLeftValue={this.onChangePriceLeftValue}
                    onChangeRightValue={this.onChangePriceRightValue}
                />
            </form>
        )
    }
}