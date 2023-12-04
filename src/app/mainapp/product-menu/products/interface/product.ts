import { Category } from "../../categories/interface/category";
import { ProductImage } from "./product-images";

export class Product {
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    dimension: string = '';
    weight: number = 0;
    weightUnit: number = 0;
    categoryId: number = 0;
    isActive:boolean = false;
    category: Category = new Category();
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    productImages: ProductImage[] = [];
}
