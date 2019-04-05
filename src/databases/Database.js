export class Database {
    async getDish(restaurantId, categoryId, dishId) {
        throw new Error("get dish is not implemented")
    }
    async getCategories(restaurantId) {
        throw new Error("get categories is not implemented")
    }
    async getCategoryDishes(restaurantId, categoryId, page, onPage) {
        throw new Error("get category dishes is not implemented")
    }
}