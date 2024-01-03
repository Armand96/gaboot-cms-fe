import { Product } from "../../product-menu/products/interface/product";

export class OrderDetail {
    id: number = 0;
    orderId: number = 0;
    productId: number = 0;
    price: number = 0;
    discount: number = 0;
    quantity: number = 0;
    total: number = 0;
    product: Product = new Product();
}