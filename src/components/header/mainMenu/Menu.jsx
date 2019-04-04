import React, { Component } from 'react';

import { LocalRequestsSender } from "../../../requestsSenders";

import { DefaultMenuItem } from "./DefaultMenuItem.jsx";
import { DropDownMenuItem } from "./DropDownMenuItem.jsx";

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

        if(this.state.isLoading) {
            menu = [{
                data: {
                    link: '#',
                    text: 'Завантажується',
                },
                key: 'loading',
            }]
        }

        return (
            <nav>
                <input type="checkbox" className="burger-menu" id="burger-menu" />
                <label htmlFor="burger-menu">
                    <span />
                    <span />
                    <span />
                </label>
                <ul className="main-menu">
                    <DropDownMenuItem active={true} text={'Меню'} items={menu}/>
                    <DefaultMenuItem active={false} link={'/events'} text={'Заходи'}/>
                    <DefaultMenuItem active={false} link={'/reservation'} text={'Забронювати столик'}/>
                    <DefaultMenuItem active={false} link={'/about'} text={'Про нас'}/>
                </ul>
            </nav>
        )
    }
}