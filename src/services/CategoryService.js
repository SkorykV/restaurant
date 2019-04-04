import {BaseService} from "./BaseService";

export class CategoryService extends BaseService{

    async getCategoryDishes(restaurantId, categoryId) {
        return await this.database.getCategoryDishes(restaurantId, categoryId);
    }
}