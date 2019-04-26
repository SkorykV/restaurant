import React from 'react'


export const Restaurant = ({restaurantStructure}) => {
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
};