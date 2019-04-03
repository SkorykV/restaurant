
export class BaseService {
    constructor(DatabaseClass) {
        this.database = new DatabaseClass();
    }
}