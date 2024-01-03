import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { Order } from '../interface/order';
import { OrderDetail } from '../interface/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(private api: ApiService) { }
    private baseUrl: string = 'order/';
    private baseUrl2: string = 'order';

    getOrders(params = '') {
        return this.api.getAPI<ResponseSuccess<Order>>(
            this.baseUrl2 + params,
        );
    }

    getOrder(id: number) {
        return this.api.getAPI<ResponseSuccess<Order>>(this.baseUrl + id);
    }

    // updateOrder(id: number, data: OrderCreateDto) {
    //     return this.api.patchAPI<ResponseSuccess<Order>>(
    //         this.baseUrl + id,
    //         data,
    //     );
    // }

    /* ====================================== */
    getOrderDetails(orderId: number) {
        return this.api.getAPI<ResponseSuccess<OrderDetail>>(this.baseUrl + orderId);
    }
}
