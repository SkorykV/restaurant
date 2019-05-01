import React, { Component } from 'react';
import PropTypes from "prop-types";

import {validateLogin, validatePassword } from "../../../lib";

import { ModalForm } from "../../modalForm";
import {LocalRequestsSender} from "../../../requestsSenders";

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: "",
            password: "",
            errors: null,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevProps.show && this.props.show) {
            this.setState({errors: null})
        }
        else if(!prevState.isLoading && this.state.isLoading) {
            LocalRequestsSender.getUserByUsernamePassword(this.state.username, this.state.password).then(
                data => {
                    this.setState({isLoading: false});
                    this.props.onLogin(data.user);
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
        if(this.state.username === "") {
            errors.username = 'Поле має бути заповнене'
        }
        else {
            const loginResult = validateLogin(this.state.username);

            if(!loginResult.status) {
                errors.username = loginResult.error;
            }
        }

        if(this.state.password === "") {
            errors.password = 'Поле має бути заповнене'
        }
        else {
            const passwordResult = validatePassword(this.state.password);

            if (!passwordResult.status) {
                errors.password = passwordResult.error;
            }
        }

        if(!errors.username && !errors.password) {
            this.setState({isLoading: true, errors: null});
        }
        else {
            this.setState({errors})
        }
    }

    render() {
        return (
            <ModalForm
                title={"Авторизація"}
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

                {
                    this.state.errors && this.state.errors.form &&
                        <div className="form-alert form-alert-error">{this.state.errors.form}</div>
                }
                {
                    this.state.isLoading &&
                    <div className="form-alert form-alert-attention">Запит обробляється</div>
                }

            </ModalForm>
        )
    }
}


LoginForm.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
    show: false,
    onClose: f=>f,
    onLogin: f=>f,
};
