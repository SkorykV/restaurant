import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {LocalRequestsSender} from "../../../requestsSenders";

import { Restaurant } from './Restaurant'
import { ReservationTimeFilter } from "./ReservationTimeFilter";
import {CongratsModalForm} from "../../modalForm";
import {userShape} from "../../../constants";

export class Reservation extends Component {

    static deleteReservation(tableId, userId, reservationId) {
        return LocalRequestsSender.deleteReservation(
            'myFirstRestaurant',
            tableId,
            userId,
            reservationId,
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            restaurantStructure: null,
            reservations: null,
            selectedTimeStamp: null,
            selectedStartTime: null,
            selectedEndTime: null,
            isLoadingStructure: false,
            isLoadingReservations: false,
            isSendingRequest: false,
            reservationRequest: null,
            error: null,
            message: null,
            showCongratsModal: false,
        };

        this.handleTimeFilterSubmit = this.handleTimeFilterSubmit.bind(this);
        this.handleTableClick = this.handleTableClick.bind(this);
        this.handleCongratsModalClose = this.handleCongratsModalClose.bind(this);
    }

    componentDidMount() {
        this.setState({isLoadingStructure: true});
        LocalRequestsSender.getRestaurantStructureRequest('myFirstRestaurant').then(
            data => {

                this.setState({
                    restaurantStructure: data,
                    isLoadingStructure: false,
                })
            },
            error => { this.setState({isLoadingStructure: false, error })}
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.isLoadingReservations && this.state.isLoadingReservations) {
            this.loadReservations();
        }
        if(!prevState.isSendingRequest && this.state.isSendingRequest) {
            this.request().then(
                () => {
                    this.setState({
                        isSendingRequest: false,
                        isLoadingReservations: true,
                    });
                },
                error => this.setState({isSendingRequest: false, isLoadingReservations: true, error: error.message})
            )
        }
    }

    loadReservations() {
        LocalRequestsSender.getReservedTables(
            'myFirstRestaurant',
            this.state.selectedTimeStamp,
            this.state.selectedStartTime,
            this.state.selectedEndTime,
        ).then(
            (data) => {
                this.setState({
                    isLoadingReservations: false,
                    reservations: data.reservations,
                });
            },
            error => this.setState({isLoadingReservations: false, error: error.message})
        )
    }

    handleTimeFilterSubmit(timestamp, startTime, endTime) {
        this.setState((prevState) => {
            if(prevState.isLoadingReservations || prevState.isSendingRequest) {
                return;
            }
            return {
                isLoadingReservations: true,
                error: null,
                selectedTimeStamp: timestamp,
                selectedStartTime: startTime,
                selectedEndTime: endTime,
            }
        })
    }

    handleTableClick(table, user, reservationId) {
        if(!user) {
            this.props.onLoginModalOpen();
            return
        }
        if(reservationId === null) {
            this.request = this.addReservation.bind(this, table.id, user.id);
        }
        else {
            this.request = Reservation.deleteReservation.bind(this, table.id, user.id, reservationId);
        }
        this.setState((prevState) => {
            if(prevState.isLoadingReservations || prevState.isSendingRequest) {
                return;
            }
            return {
                isSendingRequest: true,
                error: null,
            }
        });
    };

    addReservation(tableId, userId) {
        return LocalRequestsSender.addReservation(
            'myFirstRestaurant',
            tableId,
            userId,
            this.state.selectedTimeStamp,
            this.state.selectedStartTime,
            this.state.selectedEndTime,
        ).then(
            () => {
                this.setState({
                    showCongratsModal: true,
                });
            }
        )
    }

    handleCongratsModalClose() {
        this.setState({
            showCongratsModal: false,
        })
    }

    render() {
        const restaurantStructure = this.state.restaurantStructure;
        if(this.state.isLoadingStructure) {
            return <h2>Почекайте, будь ласка, структура ресторану завантажується</h2>
        }
        if(this.state.error && !restaurantStructure){
            return <h2>Вибачте, щось пішло не так.</h2>
        }
        if(!restaurantStructure) {
            return <div />
        }

        const message = (
            this.state.isLoadingReservations ? "Зачекайте, Інформація про бронювання оновлюється" :
                this.state.isSendingRequest ? "Зачекайте, Ваш запит на зміну бронювання виконується" : null
        );

        return (
            <div className="clearfix">
                <div className="restaurant-map">
                    <h2>Карта ресторану</h2>
                    <Restaurant
                        restaurantStructure={restaurantStructure}
                        reservations={this.state.reservations}
                        user={this.props.user}
                        onTableClick={this.handleTableClick}
                    />
                </div>
                <div className="reservationTimeFilter">
                    <h2>Оберіть, будь ласка, дату і час</h2>
                    <ReservationTimeFilter
                        error={this.state.error}
                        message={message}
                        onSubmit={this.handleTimeFilterSubmit}
                    />
                </div>
                <CongratsModalForm
                    show={this.state.showCongratsModal}
                    onClose={this.handleCongratsModalClose}
                />
            </div>
        )
    }
}

Reservation.propTypes = {
    user: PropTypes.shape(userShape),
    onLoginModalOpen: PropTypes.func,
};

Reservation.defaultProps = {
    user: null,
    onLoginModalOpen: f=>f,
};
