import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class EventsService extends BaseService{

    async getRestaurantEvents(restaurantId) {
        const now = (new Date).getTime();
        const events = await this.database.getRestaurantEvents(restaurantId, now);
        if(events === null) {
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        return new ServiceResponse(true, {events}, null);
    }

    async getRestaurantEvent(restaurantId, eventId) {
        const now = (new Date).getTime();
        const event = await this.database.getRestaurantEvent(restaurantId, eventId, now);
        if(event === null) {
            return new ServiceResponse(false, null, "Захід не було знайдено");
        }
        return new ServiceResponse(true, {event}, null);
    }

    async getRestaurantEventsSlides(restaurantId) {
        const now = (new Date).getTime();
        const slides = await this.database.getRestaurantEventsSlides(restaurantId, now);
        if(slides === null) {
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        return new ServiceResponse(true, {slides}, null);
    }
}
