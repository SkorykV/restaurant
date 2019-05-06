import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class CategoryService extends BaseService{

    async getCategoryDishes(restaurantId, categoryId, page=null, onPage=null) {
        const content = await this.database.getCategoryDishes(restaurantId, categoryId, page, onPage);
        if(content !== null) {
            return new ServiceResponse(true, content, null);
        }
        return new ServiceResponse(false, null, 'Категорія не була знайдена');
    }
}
