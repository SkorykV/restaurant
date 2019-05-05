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
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
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

    static async registerUser(username, password, name, surname, telephone) {
        const response = await LocalHandler.registerUser(username, password, name, surname, telephone);
        if(!response.status) {
            throw new Error(response.error);
        }
        return true;
    }

    static async getReservedTables(restaurantId, date, startTime, endTime) {
        const response = await LocalHandler.getReservedTables(restaurantId, date, startTime, endTime);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async addReservation(restaurantId, tableId, userId, date, startTime, endTime) {
        const response = await LocalHandler.addReservation(restaurantId, tableId, userId, date, startTime, endTime);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async deleteReservation(restaurantId, tableId, userId, reservationId) {
        const response = await LocalHandler.deleteReservation(restaurantId, tableId, userId, reservationId);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async getRestaurantEvents(restaurantId) {
        const response = await LocalHandler.getRestaurantEvents(restaurantId);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async getRestaurantEvent(restaurantId, eventId) {
        const response = await LocalHandler.getRestaurantEvent(restaurantId, eventId);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

    static async getRestaurantEventsSlides(restaurantId) {
        const response = await LocalHandler.getRestaurantEventsSlides(restaurantId);
        if(!response.status) {
            throw new Error(response.error);
        }
        return response.data;
    }

}
