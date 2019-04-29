import { LocalHandler } from "../handlers";

export class LocalRequestsSender {
    static async getDishRequest(restaurantId, categoryId, dishId) {
        return await LocalHandler.getDish(restaurantId, categoryId, dishId);
    }

    static async getCategoriesRequest(restaurantId) {
        return await LocalHandler.getCategories(restaurantId);
    }

    static async getCategoryDishesRequest(restaurantId, categoryId, page) {
        const response = await LocalHandler.getCategoryDishes(restaurantId, categoryId, page);
        if(response === null) {
            throw new Error('something went wrong')
        }
        return response;
    }

    static async getDishesByParamsRequest(restaurantId, requestParams, responseParams) {
        const response = await LocalHandler.getDishesByParams(restaurantId, requestParams, responseParams);
        if(response === null) {
            throw new Error('something went wrong')
        }
        return response;
    }

    static async getRestaurantStructureRequest(restaurantId) {
        const response = await LocalHandler.getRestaurantStructure(restaurantId);
        if(response === null) {
            throw new Error('something went wrong')
        }
        return response;
    }
}
