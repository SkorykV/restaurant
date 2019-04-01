
export class DishService {
    constructor(DatabaseClass) {
        this.database = new DatabaseClass();
    }

    async getDish() {
        return await this.database.getDish();
    }
}