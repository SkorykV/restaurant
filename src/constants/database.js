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
                    events: [
                        {
                            id: '0',
                            title: 'МАМАХОХОТАЛА ШОУ',
                            sliderImage: 'mamahohotala.png',
                            logoImage: 'mamahohotala_logo.jpg',
                            timeStamp: (new Date('2019-05-21T19:00:00')).getTime(),
                            price: "299-899",
                            text: `Це буде на 100% нова програма. Актуальний гумор на теми сьогоднішнього дня. Ми будемо жартувати про те, що ви зараз самі обговорюєте з друзями, колегами та близькими.

Це професійне ШОУ з великої літери, яке записується для телеканалу «НЛО TV», причому з усіма відповідними атрибутами.

Концертний зал з великою сценою. Яскраве світло і живий звук. Окремі декорації для кожного номера і звичайно ж камери, які знімають все, що відбувається — як на сцені, так і в залі для глядачів.

Самі номери йдуть в нон-стоп режимі, без пауз і дублів. Постановка, акторська гра і активна робота з глядачами. І одна важлива деталь: шоу проводиться для гостей в залі, а лише потім його показують на ТБ.`,
                        },
                        {
                            id: '1',
                            title: 'ІМПРОВІЗАЦІЯ ДЛЯ ДОРОСЛИХ',
                            sliderImage: 'improv.jpg',
                            logoImage: 'improv_logo.jpg',
                            timeStamp: (new Date('2019-05-23T19:00:00')).getTime(),
                            price: "250-550",
                            text: `Непредсказуемо, ярко, умно, смешно, энергично, откровенно, удивительно!

«Импровизация для взрослых» — уникальный проект, который совмещает в себе театр, легендарные Бродвейские импровизационные шоу, интерактивное общение со зрителем и — самое главное — создание спектакля здесь и сейчас.

Это увлекательное действие без сценария, где главными драматургами становятся зрители. Именно они решают: где и в каких ролях окажутся актеры в следующую секунду. И задача актеров — максимально ярко развить идею зрителя, чтобы получить полноценное произведение искусства.`,
                        },
                    ],
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
                            reservations: [
                                {
                                    id: '0',
                                    userId: '0',
                                    date: (new Date(2019,4,10)).getTime(),
                                    startTime: {h: 18, m: 30},
                                    endTime: {h: 20, m: 0},
                                },
                                {
                                    id: '1',
                                    userId: '1',
                                    date: (new Date(2019,4,10)).getTime(),
                                    startTime: {h: 20, m: 0},
                                    endTime: {h: 21, m: 30},
                                }
                            ]
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
                            reservations: [{
                                id: '2',
                                userId: '1',
                                date: (new Date(2019,4,10)).getTime(),
                                startTime: {h: 18, m: 15},
                                endTime: {h: 20, m: 30},
                            }]
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
                    telephone: "096-0569073"
                },
                {
                    id: '1',
                    username: "test",
                    password: "test1234",
                    name: "Владимир",
                    surname: "Скорик",
                    telephone: "096-0569073"
                },
            ],
        }
    },
};
