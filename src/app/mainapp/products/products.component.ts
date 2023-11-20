import { Component } from '@angular/core';
import { ProductsService } from './service/products.service';
import { ApiService } from '../services/api/api.service';
import { ResponseSuccess } from '../services/interfaces/response.dto';
import { Product } from './interface/product';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    constructor(
        private usrSvc: ProductsService,
        public api: ApiService,
    ) {}

    productObservable = new Observable<ResponseSuccess<Product>>();
    products = [] as Product[];
    hasLoadProduct: boolean = false;

    selectedIdProduct: number = 0;
    selectedProduct = new Subject<Product>();
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        productName: '',
        fullName: '',
    };

    ngOnInit(): void {
        this.productObservable = this.usrSvc.getProducts();
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedProduct.unsubscribe();
    }

    /* ====================================== */

    search() {
        const stringParams = this.api.searchParam(this.dataSearch);

        this.usrSvc.getProducts(stringParams).subscribe({
            next: (resp) => {
                this.products = resp.data;
                this.totalData = resp.totalData;
                this.hasLoadProduct = true;
                // this.api.successToastr(resp.message, 'Success');
            },
            error: this.api.errorHandler,
        });
    }

    onPageChange(page: number) {
        this.dataSearch.page = page;
        this.search();
    }

    /* CREATE MODAL */
    create() {
        this.isOpenModalCru = true;
        this.operationMode = 'Create Product';
        this.selectedProduct.next({} as Product);
    }

    /* EDIT MODAL */
    edit(id: number) {
        this.selectedIdProduct = id;
        this.usrSvc.getProduct(id).subscribe({
            next: (res) => {
                this.selectedProduct.next(res.datum);
                this.operationMode = 'Update Product';
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    /* OPEN DELETE MODAL */
    delete(product: Product) {
        this.isOpenModalDel = true;
        this.selectedProduct.next(product);
    }

    /* CLOSE MODAL CREATE UPDATE */
    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.search();
    }

    /* CLOSE MODAL DELETE */
    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.search();
    }
}
