import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {InputTime} from "../../form-inputs";
import {servicesC, timeShape} from "../../../constants";
import {getDateValidator, getTimeValidator, addDays, getLocalDateString} from "../../../lib";

export class ReservationTimeFilter extends Component {

    static getFieldError(value, validator) {
        if(value === "" || value === null) {
            return 'Поле має бути заповнене'
        }
        const result = validator(value);

        if(!result.status) {
            return result.error;
        }
        else {
            return null;
        }
    }

    static timeSubstraction(time1, time2) {
        return (time1.h * 60 + time1.m) - (time2.h * 60 + time2.m);
    }

    static validateDateField(value) {
        return /^(\d+-){0,2}\d*$/.test(value)
    }

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            startTime: null,
            endTime: null,
            errors: null,
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.startTimeChangeHandler = this.getTimeChangeHandler('startTime').bind(this);
        this.endTimeChangeHandler = this.getTimeChangeHandler('endTime').bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getTimeChangeHandler(name) {
        return (value) => {
            this.setState({
                [name]: value,
            })
        }
    }

    handleDateChange(event) {
        const value = event.target.value;
        if(ReservationTimeFilter.validateDateField(value)) {
            this.setState({
                date: value,
            })
        }
    }

    handleSubmit(event) {
        const validateDate = getDateValidator(this.props.minDate, this.props.maxDate);
        const validateTime = getTimeValidator(this.props.minTime, this.props.maxTime);
        const errors = {};
        errors.date = ReservationTimeFilter.getFieldError(this.state.date, validateDate);

        errors.startTime = ReservationTimeFilter.getFieldError(this.state.startTime, validateTime);

        errors.endTime = ReservationTimeFilter.getFieldError(this.state.endTime, validateTime);

        if(!errors.startTime && !errors.endTime &&
            ReservationTimeFilter.timeSubstraction(this.state.endTime, this.state.startTime) < this.props.minReservationTime) {
            errors.endTime = `Мінімальний час бронювання - ${this.props.minReservationTime} хвилин`
        }

        if(!errors.date && !errors.startTime && !errors.endTime) {
            const parts = this.state.date.split('-').map(_ => +_);
            //-1 from month number, because new Date takes month in range 0-11
            const date = new Date(parts[0], parts[1]-1, parts[2]);
            this.setState({errors},()=>{
                this.props.onSubmit(date, this.state.startTime, this.state.endTime);
            });
        }
        else {
            this.setState({errors})
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="reservation-form">
                    <label className="default-form-label big-label">
                        <span>Оберіть дату бронювання:</span>
                        <input
                            type="date"
                            placeholder="рррр-мм-дд"
                            value={this.state.date}
                            min={getLocalDateString(this.props.minDate)}
                            max={getLocalDateString(this.props.maxDate)}
                            onChange={this.handleDateChange}
                        />
                        {
                            this.state.errors && this.state.errors.date &&
                            <div className="input-error">{this.state.errors.date}</div>
                        }
                    </label>
                    <div className="time-filters">
                        <label className="default-form-label big-label">
                            Оберіть час початку бронювання:
                            <InputTime
                                min={this.props.minTime}
                                max={this.props.maxTime}
                                value={this.state.startTime}
                                onChange={this.startTimeChangeHandler}
                            />
                            {
                                this.state.errors && this.state.errors.startTime &&
                                <div className="input-error">{this.state.errors.startTime}</div>
                            }
                        </label>
                        <label className="default-form-label big-label">
                            Оберіть час завершення бронювання:
                            <InputTime
                                min={this.props.minTime}
                                max={this.props.maxTime}
                                value={this.state.endTime}
                                onChange={this.endTimeChangeHandler}
                            />
                            {
                                this.state.errors && this.state.errors.endTime &&
                                <div className="input-error">{this.state.errors.endTime}</div>
                            }
                        </label>
                    </div>
                    {
                        this.props.error &&
                        <div className="form-alert form-alert-error">{this.props.error}</div>
                    }
                    {
                        this.props.message &&
                        <div className="form-alert form-alert-attention">{this.props.message}</div>
                    }
                    <button className="btn btn-submit" type="submit">Показати вільні столики</button>
                </form>

            </div>
        );
    }
}

ReservationTimeFilter.propTypes = {
    minReservationTime: PropTypes.number,
    minTime: PropTypes.shape(timeShape),
    maxTime: PropTypes.shape(timeShape),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    error: PropTypes.string,
    message: PropTypes.string,
    onSubmit: PropTypes.func,
};

ReservationTimeFilter.defaultProps = {
    minReservationTime: servicesC.minReservationTime,
    minTime: servicesC.restaurantStartWorkingTime,
    maxTime: servicesC.restaurantEndWorkingTime,
    minDate: addDays(new Date(), 1),
    maxDate: addDays(new Date(), servicesC.reservationPeriod),
    error: null,
    message: null,
    onSubmit: f=>f,
};
