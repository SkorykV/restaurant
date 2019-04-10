import { LocalHandler } from "../handlers";

export class LocalRequestsSender {
    static async getDishRequest(restaurantId, categoryId, dishId) {
        return await LocalHandler.getDish(restaurantId, categoryId, dishId);
    }

    static async getCategoriesRequest(restaurantId) {
        return await LocalHandler.getCategories(restaurantId);
    }

    static async getCategoryDishesRequest(restaurantId, categoryId, page) {
        return await LocalHandler.getCategoryDishes(restaurantId, categoryId, page);
    }

    static async getDishesByQueryRequest(restaurantId, queryString) {
        return await LocalHandler.getDishesByQuery(restaurantId, queryString);
    }
}