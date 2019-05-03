import React, { Component } from 'react';

import {validateLogin, validatePassword, validateTelephoneField, validateTextField} from "../../../lib";

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

    static checkTelephoneInput(value) {
        return /^(0((\d{2}-\d{0,7})|\d{0,2}))?$/.test(value);
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
            telephone: "",
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
            LocalRequestsSender.registerUser(this.state.username, this.state.password, this.state.name, this.state.surname, this.state.telephone).then(
                () => {
                    this.setState({isLoading: false, success: true});
                    this.props.onRegistration();
                },
                error => this.setState({isLoading: false, errors: {form: error.message}})
            )
        }
    }

    onChange(event) {
        if(event.target.type === "tel" && !RegistrationForm.checkTelephoneInput(event.target.value)) {
            event.preventDefault();
            return;
        }
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

        errors.telephone = RegistrationForm.getFieldError(this.state.telephone, validateTelephoneField);

        if(!errors.username && !errors.password && !errors.name && !errors.surname && !errors.telephone) {
            this.setState({isLoading: true, errors: null, success: false});
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
                <label className="default-form-label">
                    <span>
                        Логін:
                    </span>
                    <input type="text" name="username" placeholder="Логін" value={this.state.username} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.username &&
                            <div className="input-error">{this.state.errors.username}</div>
                    }
                </label>
                <label className="default-form-label">
                    <span>
                        Пароль:
                    </span>
                    <input type="password" name="password" placeholder="Пароль" value={this.state.password} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.password &&
                        <div className="input-error">{this.state.errors.password}</div>
                    }
                </label>
                <label className="default-form-label">
                    <span>
                        Ваше ім'я:
                    </span>
                    <input type="text" name="name" placeholder="Ім'я" value={this.state.name} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.name &&
                        <div className="input-error">{this.state.errors.name}</div>
                    }
                </label>
                <label className="default-form-label">
                    <span>
                        Ваше прізвище:
                    </span>
                    <input type="text" name="surname" placeholder="Прізвище" value={this.state.surname} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.surname &&
                        <div className="input-error">{this.state.errors.surname}</div>
                    }
                </label>
                <label className="default-form-label">
                    <span>
                        Номер телефону<br/>(формат: 0XX-XXXXXXX):
                    </span>
                    <input type="tel" name="telephone" placeholder="0XX-XXXXXXX" value={this.state.telephone} disabled={this.state.isLoading} onChange={this.onChange}/>
                    {
                        this.state.errors && this.state.errors.telephone &&
                        <div className="input-error">{this.state.errors.telephone}</div>
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
