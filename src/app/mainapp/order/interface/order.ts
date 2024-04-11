import { Customer } from "../../customer/interface/customer";
import { OrderStatus } from "./enum-order-status";
import { OrderDetail } from "./order-detail";

export class Order {
    id: string = "";
    name: string = "";
    customer_id: string = "";
    customer: Customer = new Customer();
    total_price: number = 0;
    discount: number = 0;
    grand_total: number = 0;
    total_item: number = 0;
    status: OrderStatus = OrderStatus.OPEN;
    expired: string = "";
    order_detail: OrderDetail[] = [];
}