import {BaseService} from "./BaseService";
import {ServiceResponse} from "../core/ServiceResponse";

export class UserService extends BaseService{

    async getUserByUsernamePassword(username, password) {
        const user = await this.database.getUserByUsername(username);
        if(user === null || user.password !== password) {
            return new ServiceResponse(false, null, 'Логін або пароль - невірний');
        }
        else {
            return new ServiceResponse(true, {user: {id: user.id, username: user.username }}, null);
        }
    }

    async addUser(username, password, name, surname, telephone) {
        const user = await this.database.getUserByUsername(username);
        if(user) {
            return new ServiceResponse(false, null, 'Користувач з таким логіном вже існує');
        }
        else {
            await this.database.addUser(username, password, name, surname, telephone);
            return new ServiceResponse(true, null, null);
        }
    }
}
