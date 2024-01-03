import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './service/order.service';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { ResponseSuccess } from '../services/interfaces/response.dto';
import { Order } from './interface/order';
import { OrderStatus } from './interface/enum-order-status';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
    constructor(
        private ordSvc: OrderService,
        public api: ApiService,
    ) {}

    ordStatus = OrderStatus;
    orderObservable = new Observable<ResponseSuccess<Order>>();
    orders = [] as Order[];
    hasLoadOrder: boolean = false;

    selectedIdOrder: number = 0;
    selectedOrder = new Subject<Order>();
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;
    isOpenModalImage: boolean = false;

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        name: '',
    };

    ngOnInit(): void {
        this.orderObservable = this.ordSvc.getOrders();
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedOrder.unsubscribe();
    }

    /* ====================================== */

    search() {
        const stringParams = this.api.searchParam(this.dataSearch);

        this.ordSvc.getOrders(stringParams).subscribe({
            next: (resp) => {
                this.orders = resp.data;
                this.totalData = resp.totalData;
                this.hasLoadOrder = true;
                // this.api.successToastr(resp.message, 'Success');
            },
            error: this.api.errorHandler,
        });
    }

    onPageChange(page: number) {
        this.dataSearch.page = page;
        this.search();
    }

    /* EDIT MODAL */
    edit(id: number) {
        this.selectedIdOrder = id;
        this.ordSvc.getOrder(id).subscribe({
            next: (res) => {
                this.selectedOrder.next(res.datum);
                // this.operationMode = constUpdateOrder;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }
}