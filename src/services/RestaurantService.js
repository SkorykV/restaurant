import {BaseService} from "./BaseService";

export class RestaurantService extends BaseService{

    async getCategories(restaurantId) {
        return await this.database.getCategories(restaurantId);
    }

    async getDishesByParams(restaurantId, {query = '', page = null, onPage = null}) {
        return await this.database.getDishesByParams(restaurantId, query, page, onPage);
    }

    async getRestaurantStructure(restaurantId) {
        return await this.database.getRestaurantStructure(restaurantId);
    }
}