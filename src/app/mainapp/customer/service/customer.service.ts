import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { Customer } from '../interface/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private api: ApiService) { }
    private baseUrl: string = 'customers/';
    private baseUrl2: string = 'customers';

    getCustomers(params = '') {
        return this.api.getAPI<ResponseSuccess<Customer>>(this.baseUrl2 + params);
    }

    getCustomer(id: number) {
        return this.api.getAPI<ResponseSuccess<Customer>>(this.baseUrl + id);
    }

    createCustomer(formData: FormData) {
        return this.api.postAPI<ResponseSuccess<Customer>>(this.baseUrl, formData);
    }

    updateCustomer(id: number, formData: FormData) {
        return this.api.patchAPI<ResponseSuccess<Customer>>(
            this.baseUrl + id,
            formData,
        );
    }

    deleteCustomer(id: number) {
        return this.api.deleteAPI<ResponseSuccess<Customer>>(this.baseUrl + id);
    }
}
