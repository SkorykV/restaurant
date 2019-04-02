import { dbC } from "../constants";
import {Dish} from "../core/menu";

import {Database} from "./Database";


export class InnerDatabase extends Database{
    static initialize() {
        if(!localStorage.getItem(dbC.innerDb.key)) {
            localStorage.setItem(
                dbC.innerDb.key,
                JSON.stringify(dbC.innerDb.data),
            )
        }
    }

    static getDatabase() {
        return JSON.parse(localStorage.getItem(dbC.innerDb.key));
    }

    async getDish(restaurantId, categoryId, dishId) {
        const restaurant = InnerDatabase.getDatabase().restaurants.find((restaurant) => restaurant.id === restaurantId);
        if(restaurant) {
            const category = restaurant.menuCategories.find((category) => category.id === categoryId);
            if(category) {
                const dish = category.dishes.find((dish) => dish.id === dishId);
                if(dish) {
                    return new Dish(dish.title, dish.image, dish.description, dish.weight, dish.price);
                }
            }
        }
        return null;
    }

}