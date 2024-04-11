import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from './service/customer.service';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { ResponseSuccess } from '../services/interfaces/response.dto';
import { Customer } from './interface/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
    constructor(
        private cusSvc: CustomerService,
        public api: ApiService,
    ) {}

    customerObservable = new Observable<ResponseSuccess<Customer>>();
    customers = [] as Customer[];
    hasLoadCustomer: boolean = false;

    selectedIdCustomer: string= "";
    selectedCustomer = new Subject<Customer>();
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        firstname: '',
        lastname: '',
        email: '',
    };

    ngOnInit(): void {
        this.customerObservable = this.cusSvc.getCustomers();
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedCustomer.unsubscribe();
    }

    /* ====================================== */

    search() {
        const stringParams = this.api.searchParam(this.dataSearch);

        this.cusSvc.getCustomers(stringParams).subscribe({
            next: (resp) => {
                this.customers = resp.data;
                this.totalData = resp.totalData;
                this.hasLoadCustomer = true;
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
    edit(id: string) {
        this.selectedIdCustomer = id;
        this.cusSvc.getCustomer(id).subscribe({
            next: (res) => {
                this.selectedCustomer.next(res.datum);
                // this.operationMode = constUpdateCustomer;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }
}