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

    static async getUserByUsernamePassword(username, password) {
        const response = await LocalHandler.getUserByUsernamePassword(username, password);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async registerUser(username, password, name, surname) {
        const response = await LocalHandler.registerUser(username, password, name, surname);
        if(!response.status) {
            throw new Error(response.error);
        }
        return true;
    }
}
