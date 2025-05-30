export class Product {
    constructor(
        
        public productId : number,
        public categoryId : number,
        public productName : string,
        public desc : string,
        public price : number,
        public qntInStack : string,
        public img : string,
        public color : string
    ){}
}
