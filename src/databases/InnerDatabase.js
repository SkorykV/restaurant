import { dbC } from "../constants";
import {Category, Dish} from "../core/menu";

import {Database} from "./Database";


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
        await InnerDatabase.timer(3000);
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            return restaurant.menuCategories.map(
                category => new Category(category.id, category.title)
            )
        }
        return null
    }

    async getCategoryDishes(restaurantId, categoryId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const category = restaurant.menuCategories.find((category) => category.id === categoryId);
            if(category) {
                return category.dishes.map(
                    dish => (new Dish(dish)).getOverview()
                )
            }
        }
        return null;
    }

}