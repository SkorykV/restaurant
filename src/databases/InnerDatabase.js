import v4 from 'uuid/v4';

import { dbC } from "../constants";
import {Category, Dish} from "../core/menu";

import {Database} from "./Database";
import {ContentPage} from "../core/pagination";
import {RestaurantStructure} from "../core/RestaurantStructure";


export class InnerDatabase extends Database{
    static timeSubstraction(time1, time2) {
        return (time1.h * 60 + time1.m) - (time2.h * 60 + time2.m);
    }

    static timeEqual(time1, time2) {
        return time1.h === time2.h && time1.m === time2.m
    }

    static timeIntIntersect(int1, int2) {
        const minus = InnerDatabase.timeSubstraction;
        if(minus(int1.startTime, int2.startTime) <= 0 && minus(int1.endTime, int2.startTime) <= 0) {
            return false;
        }
        return !(minus(int1.startTime, int2.endTime) >= 0 && minus(int1.endTime, int2.endTime) >= 0)
    }

    static initialize() {
        localStorage.setItem(
            dbC.innerDb.key,
            JSON.stringify(dbC.innerDb.data),
        )
    }

    static getDatabase() {
        return JSON.parse(localStorage.getItem(dbC.innerDb.key));
    }

    static setDatabase(data) {
        localStorage.setItem(
            dbC.innerDb.key,
            JSON.stringify(data),
        )
    }

    // TODO: delete this method
    static timer(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getDish(restaurantId, categoryId, dishId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const category = restaurant.menuCategories.find((category) => category.id === categoryId);
            if(category) {
                const dish = category.dishes.find((dish) => dish.id === dishId);
                if(dish) {
                    return new Dish(dish);
                }
            }
        }
        return null;
    }

    async getCategories(restaurantId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return restaurant.menuCategories.map(
                category => new Category(category.id, category.title)
            )
        }
        return null
    }

    async getCategoryTitle(restaurantId, categoryId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const category = restaurant.menuCategories.find((category) => category.id === categoryId);
            if(category) {
                return category.title;
            }
        }
        return null
    }

    async getCategoryDishes(restaurantId, categoryId, page, onPage) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const category = restaurant.menuCategories.find((category) => category.id === categoryId);
            if(category) {
                const skip = onPage * (page - 1);
                const dishes = category.dishes.slice(skip, skip + onPage).map(
                    dish => (new Dish(dish)).getOverview()
                );
                const totalPages = Math.ceil(category.dishes.length / onPage);
                // TODO: review if will not have title anywhere, dont return it from database
                return new ContentPage({title: category.title, dishes}, totalPages);
            }
        }
        return null;
    }

    async getDishesByParams(restaurantId, query, filters, sort, getFilters, page, onPage) {
        //await InnerDatabase.timer(1000);
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            let results =  restaurant.menuCategories.flatMap(
                category => (
                    category.dishes
                        .filter(
                            dish => dish.title.toLowerCase().includes(query.toLowerCase())
                        )
                        .map(
                            dish => ({ categoryId: category.id, dish: new Dish(dish).getOverview() })
                        )
                )
            );

            const content = {};
            if(getFilters) {
                if(results.length !== 0){
                    const ranges = {
                        price: {from: results[0].dish.price, to: results[0].dish.price},
                        weight: {from: results[0].dish.weight, to: results[0].dish.weight},
                    };
                    results.forEach(
                        result => {
                            if(result.dish.price < ranges.price.from) {
                                ranges.price.from = result.dish.price
                            }
                            else if(result.dish.price > ranges.price.to) {
                                ranges.price.to = result.dish.price
                            }

                            if(result.dish.weight < ranges.weight.from) {
                                ranges.weight.from = result.dish.weight
                            }
                            else if(result.dish.weight > ranges.weight.to) {
                                ranges.weight.to = result.dish.weight
                            }
                        }
                    );
                    const categories = {};
                    for(const result of results) {
                        if(categories[result.categoryId]) {
                            categories[result.categoryId].count += 1
                        }
                        else {
                            const title = await this.getCategoryTitle(restaurantId, result.categoryId);
                            categories[result.categoryId] = {
                                title,
                                count: 1,
                            }
                        }
                    }
                    content.filters = {...ranges, categories}
                }
                else {
                    content.filters = null;
                }
            }

            //apply filters if needed
            if(filters) {
                const {price, weight, categories} = filters;
                if(price) {
                    results = results.filter(
                        result => {
                            return result.dish.price >= price.from && result.dish.price <= price.to
                        }
                    )
                }
                if(weight) {
                    results = results.filter(
                        result => {
                            return result.dish.weight >= weight.from && result.dish.weight <= weight.to
                        }
                    )
                }
                if(categories) {
                    results = results.filter(
                        result => {
                            return  categories.indexOf(result.categoryId) !== -1
                        }
                    )
                }
            }

            if(sort) {
                switch(sort) {
                    case 'title':
                        results.sort((x, y) => x.dish.title <= y.dish.title ? -1 : 1);
                        break;
                    case 'price':
                        results.sort((x, y) => x.dish.price - y.dish.price);
                        break;
                    case 'weight':
                        results.sort((x, y) => x.dish.weight - y.dish.weight);
                        break;
                    default:
                        throw new Error('Невідоме значення параметру sort');
                }
            }

            if(page && onPage) {
                const from = onPage * (page - 1);
                const to = from + onPage;
                const totalPages = Math.ceil(results.length / onPage);
                content.results = results.slice(from, to);
                content.totalPages = totalPages;
            }
            else {
                content.results = results
            }

            return content
        }
        return null
    }

    async getRestaurantStructure(restaurantId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return new RestaurantStructure(restaurant.type, restaurant.size, restaurant.tables);
        }
        return null
    }

    async getUserByUsername(username) {
        //await InnerDatabase.timer(1000);
        const user = InnerDatabase.getDatabase().users.find(
            user => user.username === username
        );
        if(user) {
            return user;
        }
        else {
            return null;
        }
    }

    async addUser(username, password, name, surname, telephone) {
        //await InnerDatabase.timer(1000);
        const user = {
            id: v4(),
            username,
            password,
            name,
            surname,
            telephone,
        };
        const database = InnerDatabase.getDatabase();
        database.users.push(user);
        InnerDatabase.setDatabase(database);
    }

    async getReservedTables(restaurantId, date, startTime, endTime) {
        //await InnerDatabase.timer(3000);
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return restaurant.tables.flatMap(
                table => {
                    const reservation = table.reservations.find(
                        r => {
                            const int1 = {startTime, endTime};
                            const int2 = {startTime: r.startTime, endTime: r.endTime};
                            return r.date === date && InnerDatabase.timeIntIntersect(int1, int2)
                        }
                    );
                    if(!reservation) {
                        return []
                    }
                    else {
                        return [{
                            tableId: table.id,
                            ...reservation,
                            full: InnerDatabase.timeEqual(reservation.startTime, startTime) && InnerDatabase.timeEqual(reservation.endTime, endTime)}]
                    }
                }
            );
        }
        return null
    }

    async getReservationsForTable(restaurantId, tableId, date, startTime, endTime) {
        //await InnerDatabase.timer(1000);
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const table = restaurant.tables.find(table => table.id === tableId);
            if(table) {
                const reservation = table.reservations.find(
                    r => {
                        const int1 = {startTime, endTime};
                        const int2 = {startTime: r.startTime, endTime: r.endTime};
                        return r.date === date && InnerDatabase.timeIntIntersect(int1, int2)
                    }
                );
                return reservation || null;
            }
        }
        return null
    }

    async addReservation(restaurantId, tableId, userId, date, startTime, endTime) {
        //await InnerDatabase.timer(1000);
        const database = InnerDatabase.getDatabase();
        const restaurant = database.restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const table = restaurant.tables.find(table => table.id === tableId);
            if(table) {
                const reservation = {
                    id: v4(),
                    date,
                    startTime,
                    endTime,
                    userId,
                };
                table.reservations.push(reservation);
                InnerDatabase.setDatabase(database);
                return true;
            }
        }
        return false;
    }

    async deleteReservation(restaurantId, tableId, userId, reservationId) {
        //await InnerDatabase.timer(1000);
        const database = InnerDatabase.getDatabase();
        const restaurant = database.restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const table = restaurant.tables.find(table => table.id === tableId);
            if(table) {
                table.reservations = table.reservations.filter(
                    r => r.id !== reservationId || r.userId !== userId
                );
                InnerDatabase.setDatabase(database);
                return true;
            }
        }
        return false;
    }

    async getRestaurantEvents(restaurantId, timestamp) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return restaurant.events.filter(event => event.timestamp >= timestamp).sort((e1, e2) => e1.timestamp - e2.timestamp)
        }
        return null;
    }

    async getRestaurantEvent(restaurantId, eventId, timestamp) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const event = restaurant.events.find(event => event.id === eventId);
            if(event && event.timestamp >= timestamp) {
                return event;
            }
        }
        return null;
    }

    async getRestaurantEventsSlides(restaurantId, timestamp) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return restaurant.events.filter(event => event.timestamp >= timestamp).sort((e1, e2) => e1.timestamp - e2.timestamp).map(
                event => ({
                    eventId: event.id,
                    url: event.sliderImage,
                    title: event.title,
                })
            );
        }
        return null;
    }

}
