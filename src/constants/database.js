import { servicesC } from "./services";

export const dbC = {
    innerDb: {
        key: 'database',
        data: {
            restaurants: [
                {
                    id: 'myFirstRestaurant',
                    type: servicesC.restaurantTypes.rectangle,
                    size: { width: 10, height: 10},
                    menuCategories: [
                        {
                            id: '0',
                            title: 'Супи',
                            dishes: [
                                {
                                    id: 'harcho',
                                    title: 'Харчо',
                                    image: '1_harcho-500x500.png',
                                    description: 'Традиційний грузинський суп, наваристий і дуже пікантний з ярко вираженою гостротою. Готується на бульйоні із яловичини з рисом, обсмаженою ріпчастою цибулею з додавання томатної пасти, червоного перця, часника і великої кількості спецій (коріандр, хмелі-сунелі, чебрець).',
                                    weight: 300,
                                    price: 300,
                                },
                                {
                                    id: 'bozbashi',
                                    title: 'Бозбаші',
                                    image: '3_bozbash-500x500.png',
                                    description: 'Національна кавказька страва. Насичений ароматний суп.\n' +
                                        'Готується на бульйоні із баранини з обсмаженою ріпчастою цибулею, болгарським перцем і томатною пастою.\n' +
                                        'Подається з великими тефтелями із м’якоті баранини і куриці, риса і грузинських спецій, дольками картоплі і помідора.\n' +
                                        'Суп гострий.',
                                    weight: 350,
                                    price: 88,
                                },
                                {
                                    id: 'harcho1',
                                    title: 'Харчо',
                                    image: '1_harcho-500x500.png',
                                    description: 'Традиційний грузинський суп, наваристий і дуже пікантний з ярко вираженою гостротою. Готується на бульйоні із яловичини з рисом, обсмаженою ріпчастою цибулею з додавання томатної пасти, червоного перця, часника і великої кількості спецій (коріандр, хмелі-сунелі, чебрець).',
                                    weight: 300,
                                    price: 101,
                                },
                                {
                                    id: 'harcho2',
                                    title: 'Харчо',
                                    image: '1_harcho-500x500.png',
                                    description: 'Традиційний грузинський суп, наваристий і дуже пікантний з ярко вираженою гостротою. Готується на бульйоні із яловичини з рисом, обсмаженою ріпчастою цибулею з додавання томатної пасти, червоного перця, часника і великої кількості спецій (коріандр, хмелі-сунелі, чебрець).',
                                    weight: 300,
                                    price: 115,
                                },
                                {
                                    id: 'harcho3',
                                    title: 'Харчо',
                                    image: '1_harcho-500x500.png',
                                    description: 'Традиційний грузинський суп, наваристий і дуже пікантний з ярко вираженою гостротою. Готується на бульйоні із яловичини з рисом, обсмаженою ріпчастою цибулею з додавання томатної пасти, червоного перця, часника і великої кількості спецій (коріандр, хмелі-сунелі, чебрець).',
                                    weight: 300,
                                    price: 200,
                                },
                                {
                                    id: 'harcho4',
                                    title: 'Харчо',
                                    image: '1_harcho-500x500.png',
                                    description: 'Традиційний грузинський суп, наваристий і дуже пікантний з ярко вираженою гостротою. Готується на бульйоні із яловичини з рисом, обсмаженою ріпчастою цибулею з додавання томатної пасти, червоного перця, часника і великої кількості спецій (коріандр, хмелі-сунелі, чебрець).',
                                    weight: 200,
                                    price: 205,
                                },
                            ]
                        },
                        {
                            id: '1',
                            title: 'Салати',
                            dishes: [
                                {
                                    id: 'salat1',
                                    title: 'Грузинський салат з аджикою',
                                    image: 'Gryzinskiy-s-adzhikoi-500x500.jpg',
                                    description: 'Салат із свіжих бланшированих помідорів, огірків, болгарського перцю та ріпчастою цибулі. Заправляємо соусом із кінзи, шпинату, орегано, домашньої олії, волоських горіхів і зеленої аджики. За бажанням можна без цибулі',
                                    weight: 275,
                                    price: 111,
                                }
                            ]
                        },
                        {
                            id: '2',
                            title: 'Гарячі страви',
                            dishes: [

                            ]
                        }
                    ],
                    tables: [
                        {
                            id: "table1",
                            number: 1,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 0, y: 0.5},
                            reservations: []
                        },
                        {
                            id: "table2",
                            number: 2,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 0, y: 2.7},
                            reservations: []
                        },
                        {
                            id: "table3",
                            number: 3,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 0, y: 6.1},
                            reservations: []
                        },
                        {
                            id: "table4",
                            number: 4,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 0, y: 8.3},
                            reservations: []
                        },
                        {
                            id: "table5",
                            number: 5,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 8, y: 0.5},
                            reservations: []
                        },
                        {
                            id: "table6",
                            number: 6,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 8, y: 2.7},
                            reservations: []
                        },
                        {
                            id: "table7",
                            number: 7,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 8, y: 6.1},
                            reservations: []
                        },
                        {
                            id: "table8",
                            number: 8,
                            type: servicesC.restaurantTypes.rectangle,
                            size: {
                                width: 2,
                                height: 1.2,
                            },
                            position: { x: 8, y: 8.3},
                            reservations: []
                        },
                    ]
                }
            ],
            users: [
                {
                    id: '0',
                    username: "magnus",
                    password: "magnus1234",
                    name: "Владимир",
                    surname: "Скорик",
                },
                {
                    id: '1',
                    username: "test",
                    password: "test1234",
                    name: "Владимир",
                    surname: "Скорик",
                },
            ],
        }
    },
};
