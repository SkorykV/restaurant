import React, { Component } from 'react';

import {validateLogin, validatePassword, validateTextField} from "../../../lib";

import { ModalForm } from "../../modalForm";
import {LocalRequestsSender} from "../../../requestsSenders";
import PropTypes from "prop-types";

export class RegistrationForm extends Component {
    static getFieldError(value, validator) {
        if(value === "") {
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

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            isLoading: false,
            username: "",
            password: "",
            name: "",
            surname: "",
            errors: null,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevProps.show && this.props.show) {
            this.setState({errors: null, success: false})
        }
        else if(!prevState.isLoading && this.state.isLoading) {
            LocalRequestsSender.registerUser(this.state.username, this.state.password, this.state.name, this.state.surname).then(
                () => {
                    this.setState({isLoading: false, success: true});
                    this.props.onRegistration();
                },
                error => this.setState({isLoading: false, errors: {form: error.message}})
            )
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit() {
        const errors = {};
        errors.username = RegistrationForm.getFieldError(this.state.username, validateLogin);

        errors.password = RegistrationForm.getFieldError(this.state.password, validatePassword);

        errors.name = RegistrationForm.getFieldError(this.state.name, validateTextField);

        errors.surname = RegistrationForm.getFieldError(this.state.surname, validateTextField);

        if(!errors.username && !errors.password && !errors.name && !errors.surname) {
            this.setState({isLoading: true, errors: null});
        }
        else {
            this.setState({errors, success: false})
        }
    }

    render() {
        return (
            <ModalForm
                title={"Реєстрація"}
                show={this.props.show}
                onClose={this.state.isLoading? undefined : this.props.onClose}
                onSubmit={this.state.isLoading? undefined : this.handleSubmit}
            >
                <label>
                    <span>
                        Логін:
                    </span>
                    <input type="text" name="username" placeholder="Логін" value={this.state.username} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.username &&
                            <div className="input-error">{this.state.errors.username}</div>
                    }
                </label>
                <label>
                    <span>
                        Пароль:
                    </span>
                    <input type="password" name="password" placeholder="Пароль" value={this.state.password} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.password &&
                        <div className="input-error">{this.state.errors.password}</div>
                    }
                </label>
                <label>
                    <span>
                        Ваше ім'я:
                    </span>
                    <input type="text" name="name" placeholder="Ім'я" value={this.state.name} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.name &&
                        <div className="input-error">{this.state.errors.name}</div>
                    }
                </label>
                <label>
                    <span>
                        Ваше прізвище:
                    </span>
                    <input type="text" name="surname" placeholder="Прізвище" value={this.state.surname} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.surname &&
                        <div className="input-error">{this.state.errors.surname}</div>
                    }
                </label>

                {
                    this.state.errors && this.state.errors.form &&
                        <div className="form-alert form-alert-error">{this.state.errors.form}</div>
                }
                {
                    this.state.isLoading &&
                    <div className="form-alert form-alert-attention">Запит обробляється</div>
                }
                {
                    !this.state.isLoading && this.state.success &&
                    <div className="form-alert form-alert-success">Реєстрація успішна</div>
                }

            </ModalForm>
        )
    }
}

RegistrationForm.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onRegistration: PropTypes.func,
};

RegistrationForm.defaultProps = {
    show: false,
    onClose: f=>f,
    onRegistration: f => f,
};
