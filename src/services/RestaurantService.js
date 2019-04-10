import {BaseService} from "./BaseService";

export class RestaurantService extends BaseService{

    async getCategories(restaurantId) {
        return await this.database.getCategories(restaurantId);
    }

    async getDishesByQuery(restaurantId, queryString) {
        return await this.database.getDishesByQuery(restaurantId, queryString);
    }
}