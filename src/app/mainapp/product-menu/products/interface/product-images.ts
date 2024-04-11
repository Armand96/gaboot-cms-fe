import { Product } from "./product";

export class ProductImage {
    id: string = "";
    image_path: string = "";
    thumbnail_path: string = "";
    product_id: string = "";
    product: Product = {} as Product;
}