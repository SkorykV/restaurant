import {BaseService} from "./BaseService";

export class DishService extends BaseService{

    async getDish(restaurantId, categoryId, dishId) {
        return await this.database.getDish(restaurantId, categoryId, dishId);
    }
}