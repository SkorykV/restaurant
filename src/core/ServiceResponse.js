
export class ServiceResponse {
    constructor(status=false, data=null, error="something went wrong") {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}
