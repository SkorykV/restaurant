import { dbC } from "../constants";
import {Category, Dish} from "../core/menu";

import {Database} from "./Database";
import {ContentPage} from "../core/pagination";
import {RestaurantStructure} from "../core/RestaurantStructure";


export class InnerDatabase extends Database{
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

    async getDishesByParams(restaurantId, query, filters, getFilters, page, onPage) {
        await InnerDatabase.timer(1000);
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
        await InnerDatabase.timer(1000);
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

    async addUser(username, password, name, surname) {
        await InnerDatabase.timer(1000);
        const user = {
            username,
            password,
            name,
            surname,
        };
        const database = InnerDatabase.getDatabase();
        database.users.push(user);
        InnerDatabase.setDatabase(database);
    }

}
