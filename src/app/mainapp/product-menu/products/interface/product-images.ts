import { Product } from "./product";

export class ProductImage {
    id: number = 0;
    imagePath: string = "";
    thumbnailPath: string = "";
    productId: number = 0;
    product: Product = {} as Product;
}