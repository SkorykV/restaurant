import React, { Component } from 'react';

import { LocalRequestsSender } from "../../../requestsSenders";

import { DefaultMenuItem } from "./DefaultMenuItem.jsx";
import { DropDownMenuItem } from "./DropDownMenuItem.jsx";
import {CustomMenuItem} from "./CustomMenuItem";

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuCategories: [],
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        LocalRequestsSender.getCategoriesRequest('myFirstRestaurant').then(
            data => {
                const menuCategories = data.map(
                    category => ({
                        data:
                            {
                                text: category.title,
                                link: `/category/${category.id}`,
                            },
                        key: category.id,
                    })
                );

                this.setState({
                    menuCategories,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
        );
    }

    render() {
        let menu = this.state.menuCategories;

        return (
            <nav>
                <input type="checkbox" className="burger-menu" id="burger-menu" />
                <label htmlFor="burger-menu">
                    <span />
                    <span />
                    <span />
                </label>
                <ul className="main-menu">
                    <DropDownMenuItem active={true} text={'Меню'}>
                        {
                            !!menu.length && menu.map(
                                item => <DefaultMenuItem link={item.data.link} key={item.key} >{item.data.text}</DefaultMenuItem>
                            )
                        }
                        {
                            !menu.length && this.state.isLoading &&
                            <CustomMenuItem >Завантажується</CustomMenuItem>
                        }
                    </DropDownMenuItem>
                    <DefaultMenuItem link={'/events'} >Заходи</DefaultMenuItem>
                    <DefaultMenuItem link={'/reservation'} >Забронювати столик</DefaultMenuItem>
                    <DefaultMenuItem link={'/about'} >Про нас</DefaultMenuItem>
                    {
                       !this.props.user && <CustomMenuItem active={this.props.loginModalShow} onClick={this.props.onLoginModalOpen}>Увійти</CustomMenuItem>
                    }
                    {
                        this.props.user &&
                        <DropDownMenuItem active={true} text={this.props.user.username}>
                            <CustomMenuItem onClick={this.props.onLogout}>Вийти</CustomMenuItem>
                        </DropDownMenuItem>
                    }
                    {
                        !this.props.user && <CustomMenuItem active={this.props.loginModalShow} onClick={this.props.onRegistrationModalOpen}>Реєстрація</CustomMenuItem>
                    }
                </ul>
            </nav>
        )
    }
}
