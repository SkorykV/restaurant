import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class EventsService extends BaseService{

    async getRestaurantEvents(restaurantId) {
        const events = await this.database.getRestaurantEvents(restaurantId);
        if(events === null) {
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        return new ServiceResponse(true, {events}, null);
    }
}
