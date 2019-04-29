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
    async getDishesByParams(restaurantId, query, filters, getFilters, page, onPage) {
        throw new Error("get dish by params is not implemented")
    }
    async getRestaurantStructure(restaurantId) {
        throw new Error("get restaurant structure by params is not implemented")
    }
}
