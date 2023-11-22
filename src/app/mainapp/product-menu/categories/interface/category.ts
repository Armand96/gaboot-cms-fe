import { Product } from "../../products/interface/product";

export class Category {
    id: number = 0;
    name: string = "";
    description: string = "";
    imgPath: string = "";
    imgThumbPath: string = "";
    products: Product[] = [];
}
