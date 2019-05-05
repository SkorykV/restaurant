import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class RestaurantService extends BaseService{

    async getCategories(restaurantId) {
        return await this.database.getCategories(restaurantId);
    }

    async getDishesByParams(restaurantId,
                            {query='', filters=null, sort=null} = { query:'', filters:null, sort: null},
                            {getFilters=false, page=null, onPage=null} = {getFilters:false, page:null, onPage:null}) {
        try {
            const result = await this.database.getDishesByParams(restaurantId, query, filters, sort, getFilters, page, onPage);
            if(result) {
                return new ServiceResponse(true, result, null);
            }
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        catch(e) {
            return new ServiceResponse(false, null, e.message);
        }
    }

    async getRestaurantStructure(restaurantId) {
        return await this.database.getRestaurantStructure(restaurantId);
    }
}
