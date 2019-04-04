
export class Dish {
    constructor({id, title, image, description, weight, price}) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.weight = weight;
        this.price = price;
    }

    getOverview() {
        return new DishOverview(this.id, this.title, this.image, this.weight, this.price)
    }
}

export class DishOverview {
    constructor(id, title, image, weight, price) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.weight = weight;
        this.price = price;
    }
}