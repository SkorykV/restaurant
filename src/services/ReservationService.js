import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";
import {addDays, resetTime} from "../lib";

export class ReservationService extends BaseService{

    async getReservedTables(restaurantId, date, startTime, endTime) {
        const tomorrow = resetTime(addDays(new Date(), 1)).getTime();
        //needed to check that date has no time component
        const reservationDate = new Date(date).getTime();
        if( tomorrow > reservationDate) {
            return new ServiceResponse(false, null, "Вибачте, отримати дані по бронюванню менше, ніж за день - неможлив");
        }
        const reservations = await this.database.getReservedTables(restaurantId, reservationDate, startTime, endTime);
        if(reservations === null) {
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        return new ServiceResponse(true, {reservations}, null);
    }

    async addReservation(restaurantId, tableId, userId, date, startTime, endTime) {
        const tomorrow = resetTime(addDays(new Date(), 1)).getTime();
        //needed to check that date has no time component
        const reservationDate = new Date(date).getTime();
        if(tomorrow > reservationDate) {
            return new ServiceResponse(false, null, "Вибачте, додавати бронювання менше, ніж за день - неможливо");
        }
        const reservations = await this.database.getReservationsForTable(restaurantId, tableId, reservationDate, startTime, endTime);
        if(reservations === null) {
            const result = await this.database.addReservation(restaurantId, tableId, userId, reservationDate, startTime, endTime);
            if(result){
                return new ServiceResponse(true, true, null);
            }
            return new ServiceResponse(false, null, "Ресторану з таким ідентифікатором не існує");
        }
        return new ServiceResponse(false, null, "Неможливо забронювати даний столик на цей цей");
    }

    async deleteReservation(restaurantId, tableId, userId, reservationId) {
        const result = await this.database.deleteReservation(restaurantId, tableId, userId, reservationId);
        if(result) {
            return new ServiceResponse(true, true, null);
        }
        return new ServiceResponse(false, null, "Не вдалося видалити бронювання");
    }
}
