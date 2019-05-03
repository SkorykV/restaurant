import React, {Component} from 'react';

import {LocalRequestsSender} from "../../requestsSenders";
import {Card} from "../cards";

export class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        LocalRequestsSender.getRestaurantEvents('myFirstRestaurant').then(
            data => {
                this.setState({
                    events: data.events,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error: error.message })}
        );
    }

    render() {
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, категорія меню завантажується</h2>
        }
        if(this.state.error){
            return <h2>{this.state.error}</h2>
        }
        if(!this.state.events){
            return <h2>Зараз нажаль не планується ніяких заходів в цьому ресторані</h2>
        }
        return <div className="cards-container events-container">
            {
                this.state.events.map(
                    event => (
                        <Card
                            image={require(`../../images/events/${event.logoImage}`)}
                            title={event.title}
                            link='/'
                            key={event.id}
                        >
                        </Card>
                    )
                )
            }
        </div>
    }
}
