import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../interface/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { constCreateProduct } from '../product.const';
import { ProductCreateDto } from '../interface/product-create.dto';
import { Category } from '../../categories/interface/category';

@Component({
    selector: 'app-products-modal-create-update',
    templateUrl: './products-modal-create-update.component.html',
    styleUrls: ['./products-modal-create-update.component.css']
})
export class ProductsModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private prodSvc: ProductsService,
        private fb: FormBuilder,
        private api: ApiService,
    ) { }

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedProduct = new Subject<Product>();
    @Output() modalEvent = new EventEmitter<boolean>();

    product = {} as Product;
    productForm = {} as FormGroup;
    hasLoadCategories = false;
    categories: Category[] = [];

    ngOnInit(): void {
        this.setForm();

        this.selectedProduct.subscribe({
            next: (res) => {
                this.product = res;
                this.productForm.controls['name'].setValue(res.name);
                this.productForm.controls['description'].setValue(res.description);
                this.productForm.controls['price'].setValue(res.price);
                this.productForm.controls['stock'].setValue(res.stock);
                this.productForm.controls['dimension'].setValue(res.dimension);
                this.productForm.controls['weight'].setValue(res.weight);
                this.productForm.controls['weightUnit'].setValue(res.weightUnit);
                this.productForm.controls['categoryId'].setValue(res.categoryId);
                this.productForm.controls['isActive'].setValue(res.isActive);
            },
            error: this.api.errorHandler,
        });

        this.prodSvc.getCategories().subscribe({
            next: (res) => {
                this.hasLoadCategories = true;
                this.categories = res.data;
            },
            error: this.api.errorHandler
        })
    }

    ngOnDestroy(): void {
        this.selectedProduct.unsubscribe();
    }

    setForm() {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            stock: ['', Validators.required],
            dimension: ['', Validators.required],
            weight: ['', Validators.required],
            weightUnit: ['', Validators.required],
            categoryId: [null, Validators.required],
            isActive: ['']
        });
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    submitForm(value: ProductCreateDto) {

        if (this.textCreateUpdate == constCreateProduct) {
            /* CREATE USER */
            this.prodSvc.createProduct(value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            /* UPDATE USER */
            this.prodSvc.updateProduct(this.product.id, value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Update');
                },
                error: this.api.errorHandler,
            });
        }
    }
}
