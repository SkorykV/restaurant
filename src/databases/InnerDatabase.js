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

    async getCategoryDishes(restaurantId, categoryId, page, onPage) {
        await InnerDatabase.timer(1000);
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

    async getDishesByParams(restaurantId, query, page, onPage) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const dishes =  restaurant.menuCategories.flatMap(
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
            if(page && onPage) {
                const from = onPage * (page - 1);
                const to = from + onPage;
                const totalPages = Math.ceil(dishes.length / onPage);
                return new ContentPage({dishes: dishes.slice(from, to) }, totalPages)
            }
            else {
                return dishes;
            }
        }
        return null
    }

    async getRestaurantStructure(restaurantId) {
        await InnerDatabase.timer(1000);
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return new RestaurantStructure(restaurant.type, restaurant.size, restaurant.tables);
        }
        return null
    }

}