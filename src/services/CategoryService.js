import {BaseService} from "./BaseService";

import { servicesC } from "../constants";

export class CategoryService extends BaseService{

    async getCategoryDishes(restaurantId, categoryId, page) {
        const onPage = servicesC.pagination.onPage;
        return await this.database.getCategoryDishes(restaurantId, categoryId, page, onPage);
    }
}