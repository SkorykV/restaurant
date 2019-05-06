import { DatabaseImplementation } from "../databases";
import {
    DishService,
    RestaurantService,
    CategoryService,
    UserService,
    ReservationService,
    EventsService
} from "../services";

export class LocalHandler {
    static async getDish(restaurantId, categoryId, dishId) {
        const service = new DishService(DatabaseImplementation);
        return await service.getDish(restaurantId, categoryId, dishId);
    }

    static async getCategories(restaurantId) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getCategories(restaurantId);
    }

    static async getCategoryDishes(restaurantId, categoryId, page, onPage) {
        const service = new CategoryService(DatabaseImplementation);
        return await service.getCategoryDishes(restaurantId, categoryId, page, onPage);
    }

    static async getDishesByParams(restaurantId, requestParams, responseParams) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getDishesByParams(restaurantId, requestParams, responseParams);
    }

    static async getRestaurantStructure(restaurantId) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getRestaurantStructure(restaurantId);
    }

    static async getUserByUsernamePassword(username, password) {
        const service = new UserService(DatabaseImplementation);
        return await service.getUserByUsernamePassword(username, password);
    }

    static async registerUser(username, password, name, surname, telephone) {
        const service = new UserService(DatabaseImplementation);
        return await service.addUser(username, password, name, surname, telephone);
    }

    static async getReservedTables(restaurantId, date, startTime, endTime) {
        const service = new ReservationService(DatabaseImplementation);
        return await service.getReservedTables(restaurantId, date, startTime, endTime);
    }

    static async addReservation(restaurantId, tableId, userId, date, startTime, endTime) {
        const service = new ReservationService(DatabaseImplementation);
        return await service.addReservation(restaurantId, tableId, userId, date, startTime, endTime);
    }

    static async deleteReservation(restaurantId, tableId, userId, reservationId) {
        const service = new ReservationService(DatabaseImplementation);
        return await service.deleteReservation(restaurantId, tableId, userId, reservationId);
    }

    static async getRestaurantEvents(restaurantId) {
        const service = new EventsService(DatabaseImplementation);
        return await service.getRestaurantEvents(restaurantId);
    }

    static async getRestaurantEvent(restaurantId, eventId) {
        const service = new EventsService(DatabaseImplementation);
        return await service.getRestaurantEvent(restaurantId, eventId);
    }

    static async getRestaurantEventsSlides(restaurantId) {
        const service = new EventsService(DatabaseImplementation);
        return await service.getRestaurantEventsSlides(restaurantId);
    }
}
