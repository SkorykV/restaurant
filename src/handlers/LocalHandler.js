import { DatabaseImplementation } from "../databases";
import {DishService, RestaurantService, CategoryService} from "../services";

export class LocalHandler {
    static async getDish(restaurantId, categoryId, dishId) {
        const service = new DishService(DatabaseImplementation);
        return await service.getDish(restaurantId, categoryId, dishId);
    }

    static async getCategories(restaurantId) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getCategories(restaurantId);
    }

    static async getCategoryDishes(restaurantId, categoryId, page) {
        const service = new CategoryService(DatabaseImplementation);
        return await service.getCategoryDishes(restaurantId, categoryId, page);
    }

    static async getDishesByParams(restaurantId, params) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getDishesByParams(restaurantId, params);
    }

    static async getRestaurantStructure(restaurantId) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getRestaurantStructure(restaurantId);
    }
}