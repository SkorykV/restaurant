import {DishService, RestaurantService} from "../services";
import { DatabaseImplementation } from "../databases";

export class LocalHandler {
    static async getDish(restaurantId, categoryId, dishId) {
        const service = new DishService(DatabaseImplementation);
        return await service.getDish(restaurantId, categoryId, dishId);
    }

    static async getCategories(restaurantId) {
        const service = new RestaurantService(DatabaseImplementation);
        return await service.getCategories(restaurantId);
    }

}