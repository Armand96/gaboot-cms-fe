import { Product } from "../../product-menu/products/interface/product";

export class OrderDetail {
    id: string = "";
    order_id: string = "";
    product_id: string = "";
    price: number = 0;
    discount: number = 0;
    quantity: number = 0;
    total: number = 0;
    product: Product = new Product();
}