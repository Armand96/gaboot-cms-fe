import { Product } from "../../products/interface/product";

export class Category {
    id: string = "";
    name: string = "";
    description: string = "";
    image_path: string = "";
    thumbnail_path: string = "";
    products: Product[] = [];
}
