import {BaseService} from "./BaseService";

export class RestaurantService extends BaseService{

    async getCategories(restaurantId) {
        return await this.database.getCategories(restaurantId);
    }

    async getDishesByParams(restaurantId,
                            {query='', filters=null} = { query:'', filters:null},
                            {getFilters=false, page=null, onPage=null} = {getFilters:false, page:null, onPage:null}) {
        return await this.database.getDishesByParams(restaurantId, query, filters, getFilters, page, onPage);
    }

    async getRestaurantStructure(restaurantId) {
        return await this.database.getRestaurantStructure(restaurantId);
    }
}
