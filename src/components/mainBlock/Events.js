import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faClock, faTicketAlt} from "@fortawesome/free-solid-svg-icons";

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
                    event => {
                        const fullDate = new Date(event.timeStamp);

                        var options = {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                            timezone: 'UTC',
                            hour: 'numeric',
                            minute: 'numeric',
                        };

                        const parts = fullDate.toLocaleString('uk-UA', options).split(', ');

                        return (
                            <Card
                                image={require(`../../images/events/${event.logoImage}`)}
                                title={event.title}
                                link='/'
                                key={event.id}
                            >
                                <p className="card-sm-info">
                                    <FontAwesomeIcon className="card-sm-icon" icon={faCalendarAlt} />
                                    <span>{parts.slice(0,2).join(', ')}</span>
                                </p>
                                <p className="card-sm-info">
                                    <FontAwesomeIcon className="card-sm-icon" icon={faClock} />
                                    <span>{parts[2]}</span>
                                </p>
                                <p className="card-sm-info">
                                    <FontAwesomeIcon className="card-sm-icon" icon={faTicketAlt} />
                                    <span>{`${event.price} грн`}</span>
                                </p>
                            </Card>
                        )
                    }
                )
            }
        </div>
    }
}
