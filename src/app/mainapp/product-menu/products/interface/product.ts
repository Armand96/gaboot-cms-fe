import { Category } from "../../categories/interface/category";
import { ProductImage } from "./product-images";

export class Product {
    id: string = "";
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    dimension: string = '';
    weight: number = 0;
    weight_unit: number = 0;
    category_id: string = "";
    is_active:boolean = false;
    category: Category = new Category();
    created_at: Date = new Date();
    updated_at: Date = new Date();
    product_images: ProductImage[] = [];
}
