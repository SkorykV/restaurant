
export class DishService {
    constructor(DatabaseClass) {
        this.database = new DatabaseClass();
    }

    async getDish(restaurantId, categoryId, dishId) {
        return await this.database.getDish(restaurantId, categoryId, dishId);
    }
}