import React, {Component} from 'react'

export class ReservationTimeFilter extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <form >
                    <label>
                        Оберіть дату:
                        <input type="date"/>
                    </label>
                    <label>

                    </label>
                </form>

            </div>
        )
    }
}
