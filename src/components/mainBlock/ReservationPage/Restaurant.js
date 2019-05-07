import React from 'react'
import PropTypes from 'prop-types'
import {positionShape, sizeShape, timeShape, userShape} from "../../../constants";

export const Restaurant = ({restaurantStructure, reservations=[], user=null, onTableClick=f=>f}) => {
    const tableBorderWidth = 0.1;
    const restaurantBorderWidth=0.3;

    const colors = {
        border: {color: "#369", title: "Межі залу ресторану"},
        empty: {color: "black", title: "Інформація відсутня. Оберіть, будь ласка, дату і час за допомогою форми"},
        free: {color: "green", title: "Столик вільний"},
        reserved: {color: "red", title: "Столик не доступний для бронювання на цей час"},
        reservedByUser: {color: "DarkViolet", title: "Столик заброньовано Вами"},
    };

    const handleTableClick = (table, reservation, reservedByCurrentUser) => {
        if(reservedByCurrentUser) {
            onTableClick(table, user, reservation.id);
        }
        else {
            onTableClick(table, user, null);
        }
    };

    return (
        <div>
            <div className="restaurant-container">
                <div className="scheme">
                    <svg className="restaurant-svg" preserveAspectRatio="xMidYMax meet" viewBox={`0 0 ${restaurantStructure.size.width+2*restaurantBorderWidth} ${restaurantStructure.size.height+2*restaurantBorderWidth}`} xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x={restaurantBorderWidth/2}
                            y={restaurantBorderWidth/2}
                            width={restaurantStructure.size.width+restaurantBorderWidth}
                            height={restaurantStructure.size.height+restaurantBorderWidth}
                            stroke={colors.border.color} strokeWidth={restaurantBorderWidth} fill="white"
                        />
                        {
                            restaurantStructure.tables.map(
                                table => {
                                    const reservation = reservations && reservations.find(_ => _.tableId === table.id);
                                    const reservedByCurrentUser = user && reservation && reservation.full && reservation.userId === user.id;
                                    const disabled = !reservations || (reservation && !reservedByCurrentUser);

                                    let color = colors.empty.color;
                                    if(reservation) {
                                        if(reservedByCurrentUser) {
                                            color = colors.reservedByUser.color
                                        }
                                        else {
                                            color = colors.reserved.color;
                                        }
                                    }
                                    else if(reservations) {
                                        color = colors.free.color;
                                    }

                                    return (
                                        <g
                                            className={"table" + (disabled ? " reserved" : "")}
                                            key={table.id}
                                            onClick={!disabled ? () => handleTableClick(table, reservation, reservedByCurrentUser) : null}
                                        >
                                            <rect
                                                x={restaurantBorderWidth+table.position.x + tableBorderWidth/2}
                                                y={restaurantBorderWidth+table.position.y + tableBorderWidth/2}
                                                width={table.size.width - tableBorderWidth}
                                                height={table.size.height - tableBorderWidth}
                                                stroke={color}
                                                strokeWidth={tableBorderWidth}
                                                fill="white"
                                            />
                                            <text
                                                x={restaurantBorderWidth+table.position.x + table.size.width / 2}
                                                y={restaurantBorderWidth+table.position.y + table.size.height / 2}
                                                dominantBaseline="middle"
                                                textAnchor="middle"
                                                className="small"
                                                fill={color}
                                            >
                                                {table.number}
                                            </text>
                                        </g>
                                    )
                                }
                            )
                        }
                    </svg>
                </div>
            </div>
            <div className="info">
                <h3>Позначення</h3>
                <ul className="symbols">
                    {
                        Object.values(colors).map(
                            _ => (
                                <li key={_.color}>
                                    <span className="marker" style={{backgroundColor: _.color}} />
                                    <span> - </span>
                                    <span className="title">{_.title}</span>
                                </li>
                            )
                        )
                    }
                </ul>
                <ul className="notes">
                    <li>
                        * Щоб забронювати столик, або зняти бронювання - достатньо авторизуватися, обрати потрібний час і клікнути мишкою по столику на схемі.
                    </li>
                    <li>
                        ** Бронювання можливе лише на один з наступних 30 днів.
                    </li>
                </ul>
            </div>
        </div>
    )
};

Restaurant.propTypes = {
    restaurantStructure: PropTypes.shape({
        type: PropTypes.string,
        size: PropTypes.shape(sizeShape),
        tables: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
            size: PropTypes.shape(sizeShape).isRequired,
            position: PropTypes.shape(positionShape).isRequired,
        })),
    }).isRequired,
    reservations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        tableId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        date: PropTypes.number,
        startTime: PropTypes.shape(timeShape),
        endTime: PropTypes.shape(timeShape),
    })),
    user: PropTypes.shape(userShape),
    onTableClick: PropTypes.func,
};
