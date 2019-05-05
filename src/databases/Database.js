export class Database {
    async getDish(restaurantId, categoryId, dishId) {
        throw new Error("get dish is not implemented")
    }
    async getCategories(restaurantId) {
        throw new Error("get categories is not implemented")
    }
    async getCategoryTitle(restaurantId, categoryId) {
        throw new Error("get category title is not implemented")
    }
    async getCategoryDishes(restaurantId, categoryId, page, onPage) {
        throw new Error("get category dishes is not implemented")
    }
    async getDishesByParams(restaurantId, query, filters, sort, getFilters, page, onPage) {
        throw new Error("get dishes by params is not implemented")
    }
    async getRestaurantStructure(restaurantId) {
        throw new Error("get restaurant structure by params is not implemented")
    }

    //users
    async getUserByUsername(username) {
        throw new Error("get user by username is not implemented")
    }
    async addUser(username, password, name, surname, telephone) {
        throw new Error("add user is not implemented")
    }

    //reservations
    async getReservedTables(restaurantId, date, startTime, endTime) {
        throw new Error("get reservations is not implemented")
    }

    async getReservationsForTable(restaurantId, tableId, date, startTime, endTime) {
        throw new Error("get reservations for table is not implemented")
    }

    async addReservation(restaurantId, tableId, userId, date, startTime, endTime) {
        throw new Error("add reservation is not implemented")
    }

    async deleteReservation(restaurantId, tableId, userId, reservationId) {
        throw new Error("delete reservation is not implemented")
    }

    // events
    async getRestaurantEvents(restaurantId, timestamp) {
        throw new Error("get restaurant events is not implemented")
    }

    async getRestaurantEvent(restaurantId, eventId, timestamp) {
        throw new Error("get restaurant event by id is not implemented")
    }

    //slider api
    async getRestaurantEventsSlides(restaurantId, timestamp) {
        throw new Error("get restaurant events slides is not implemented")
    }
}
