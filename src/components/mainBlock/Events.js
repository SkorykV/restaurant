import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faClock, faTicketAlt} from "@fortawesome/free-solid-svg-icons";

import {LocalRequestsSender} from "../../requestsSenders";
import {Card} from "../cards";
import {getLocalDateTime} from "../../lib";

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
            return <h2>Почекайте, будь ласка, список заходів завантажується</h2>
        }
        if(this.state.error){
            return <h2>{this.state.error}</h2>
        }
        if(!this.state.events.length){
            return <h2>Зараз на жаль не планується ніяких заходів в цьому ресторані</h2>
        }
        return <div className="cards-container events-container">
            {
                this.state.events.map(
                    event => {
                        const fullDate = new Date(event.timestamp);

                        const {date, time} = getLocalDateTime(fullDate);

                        return (
                            <Card
                                image={require(`../../images/events/${event.logoImage}`)}
                                title={event.title}
                                link={`/events/${event.id}`}
                                key={event.id}
                            >
                                <p className="icon-info icon-info-sm">
                                    <FontAwesomeIcon className="icon" icon={faCalendarAlt} />
                                    <span>{date}</span>
                                </p>
                                <p className="icon-info icon-info-sm">
                                    <FontAwesomeIcon className="icon" icon={faClock} />
                                    <span>{time}</span>
                                </p>
                                <p className="icon-info icon-info-sm">
                                    <FontAwesomeIcon className="icon" icon={faTicketAlt} />
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
