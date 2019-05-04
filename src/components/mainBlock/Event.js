import React, {Component} from 'react'

import {LocalRequestsSender} from "../../requestsSenders";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faClock, faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import {getLocalDateTime} from "../../lib";

export class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null,
            isLoading: false,
            error: null,
        }
    }


    fetchData() {
        this.setState({isLoading: true});
        const { eventId } = this.props.match.params;
        LocalRequestsSender.getRestaurantEvent('myFirstRestaurant', eventId).then(
            data => {

                this.setState({
                    event: data.event,
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
        const event = this.state.event;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, інформація про захід завантажується</h2>
        }
        if(this.state.error) {
            return <h2>{this.state.error}</h2>
        }
        if(!event){
            return <div />
        }

        const fullDate = new Date(event.timestamp);

        const {date, time} = getLocalDateTime(fullDate);

        return <div className="item-page">
            <div className="img-col img-col-md">
                <img src={require(`../../images/events/${event.logoImage}`)} alt={event.title} />
            </div>
            <div className="content-col content-col-lg content-col-padding">
                <h2 className="title">{event.title}</h2>
                <div className="event-params">
                    <span className="event-info event-info-md">
                        <FontAwesomeIcon className="event-icon" icon={faCalendarAlt} />
                        <span>{date}</span>
                    </span>
                    <span className="event-info event-info-md">
                        <FontAwesomeIcon className="event-icon" icon={faClock} />
                        <span>{time}</span>
                    </span>
                </div>
                {
                    event.text.split('\n').map(
                        (paragraph,i) =>
                            <p className="item-description" key={i}>
                                { paragraph }
                            </p>
                    )
                }
                <p className="event-info event-info-md vertically-centered">
                        <FontAwesomeIcon className="event-icon" icon={faTicketAlt} />
                        <span>{`${event.price} грн`}</span>
                </p>
            </div>
        </div>
    }
}
