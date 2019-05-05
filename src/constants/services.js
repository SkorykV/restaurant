export const servicesC = {
    pagination: {
        onPage: 4,
    },
    restaurantTypes: {
        rectangle: "rectangle",
    },
    tableTypes: {
        rectangle: "rectangle",
    },
    restaurantStartWorkingTime: {
        h: 11,
        m: 30,
    },
    restaurantEndWorkingTime: {
        h: 23,
        m: 30,
    },
    reservationPeriod: 30,
    minReservationTime: 60,
    sortOptions: [
        {
            label: 'За назвою страви',
            value: 'title',
        },
        {
            label: 'За ціною страви',
            value: 'price',
        },
        {
            label: 'За вагою страви',
            value: 'weight',
        },
    ],
    defaultSortOption: 0,
};
