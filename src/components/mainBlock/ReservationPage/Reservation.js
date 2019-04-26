import React, {Component} from 'react'

import {LocalRequestsSender} from "../../../requestsSenders";

import { Restaurant } from './Restaurant'
import { ReservationTimeFilter } from "./ReservationTimeFilter";

export class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantStructure: null,
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        LocalRequestsSender.getRestaurantStructureRequest('myFirstRestaurant').then(
            data => {

                this.setState({
                    restaurantStructure: data,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
        );
    }

    render() {
        const restaurantStructure = this.state.restaurantStructure;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, структура ресторану завантажується</h2>
        }
        if(this.state.error){
            return <h2>Вибачте, щось пішло не так.</h2>
        }
        if(!restaurantStructure) {
            return <div />
        }

        return (
            <div>
                <Restaurant restaurantStructure={restaurantStructure}/>
                <ReservationTimeFilter />
            </div>
        )
    }
}