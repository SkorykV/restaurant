import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class DishService extends BaseService{

    async getDish(restaurantId, categoryId, dishId) {
        const dish = await this.database.getDish(restaurantId, categoryId, dishId);
        if(dish) {
            return new ServiceResponse(true, {dish}, null);
        }
        return new ServiceResponse(false, null, 'Страва не була знайдена');
    }
}
