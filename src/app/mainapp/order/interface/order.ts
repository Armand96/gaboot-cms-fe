import { OrderStatus } from "./enum-order-status";
import { OrderDetail } from "./order-detail";

export class Order {
    id: number = 0;
    name: string = "";
    customerId: number = 0;
    totalPrice: number = 0;
    discount: number = 0;
    grandTotal: number = 0;
    totalItem: number = 0;
    status: OrderStatus = OrderStatus.OPEN;
    expired: string = "";
    orderDetail: OrderDetail[] = [];
}