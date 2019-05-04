import React, {Component} from 'react'

import {sliderC} from "../../constants/slider";

import {Slider} from "../slider/Slider";
import {LocalRequestsSender} from "../../requestsSenders";


export class MainPageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            error: null,
        }
    }

    componentDidMount() {

        LocalRequestsSender.getRestaurantEventsSlides('myFirstRestaurant').then(
            data => {
                this.setState({
                    slides: data.slides,
                })
            },
            error => { this.setState({isLoading: false, error: error.message })}
        );
    }

    render() {
        if(this.state.error){
            return <h2>{this.state.error}</h2>
        }

        return (
            <Slider slides={this.state.slides} pause={sliderC.pause}/>
        )
    }
}
