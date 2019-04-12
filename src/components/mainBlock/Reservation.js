import React, {Component} from 'react'

import {LocalRequestsSender} from "../../requestsSenders";

export class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantStructure: null,
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        LocalRequestsSender.getRestaurantStructureRequest('myFirstRestaurant').then(
            data => {

                this.setState({
                    restaurantStructure: data,
                    isLoading: false,
                })
            },
            error => { this.setState({isLoading: false, error })}
        );
    }

    render() {
        const restaurantStructure = this.state.restaurantStructure;
        if(this.state.isLoading) {
            return <h2>Почекайте, будь ласка, структура ресторану завантажується</h2>
        }
        if(this.state.error){
            return <h2>Вибачте, щось пішло не так.</h2>
        }
        if(!restaurantStructure) {
            return <div />
        }

        return (
            <div className="restaurant">
                {
                    restaurantStructure.tables.map(
                        table => {
                            const x = table.position.x / restaurantStructure.size.width * 100;
                            const y = table.position.y / restaurantStructure.size.width * 100;
                            const width = table.size.width / restaurantStructure.size.width * 100;
                            const height = table.size.height / restaurantStructure.size.width * 100;

                            const style = {left: `${x}%`, bottom:`${y}%`, width: `${width}%`, height: `${height}%`};

                            console.log(style);

                            return (
                                <div style={style} className="table" key={table.id}>
                                    <span className="table-number">{table.number}</span>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}