
export class Category {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

export class CategoryPage {
    constructor(title, dishes, totalPages) {
        this.title = title;
        this.dishes = dishes;
        this.totalPages = totalPages;
    }
}