import { Product } from "./product";

export class Item {
    constructor(
        public index: number,
        public product: Product,
        public quantity:number
    ){}
}


