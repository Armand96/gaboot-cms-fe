import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { ProductsService } from '../service/products.service';
import { Subject } from 'rxjs';
import { Product } from '../interface/product';
import { ProductImage } from '../interface/product-images';

@Component({
  selector: 'app-products-images',
  templateUrl: './products-images.component.html',
  styleUrls: ['./products-images.component.css']
})
export class ProductsImagesComponent implements OnInit, OnDestroy {

    constructor(
        private prodSvc: ProductsService,
        private fb: FormBuilder,
        public api: ApiService,
    ){}
    
    @Input() isOpenedModal: boolean = false;
    @Input() selectedProduct = new Subject<Product>();
    @Output() modalEvent = new EventEmitter<boolean>();

    productImages: ProductImage[] = [];
    product = {} as Product;
    imageForm = {} as FormGroup;
    fileData = {} as File;
    files: File[] = [];

    ngOnInit(): void {
        this.setForm();

        this.selectedProduct.subscribe({
            next: res => {
                this.product = res;
                this.prodSvc.getProductImages(res.id).subscribe({
                    next: res => this.productImages = res.data,
                    error: this.api.errorHandler
                })
            },
            error: this.api.errorHandler
        })
    }

    ngOnDestroy(): void {
        this.selectedProduct.unsubscribe();
    }

    setForm() {
        this.imageForm = this.fb.group({
            img: [null]
        });

        this.fileData = {} as File;
    }

    fileProgress(fileInput: any) {
        for (var i = 0; i < fileInput.target.files.length; i++) { 
            this.files.push(fileInput.target.files[i]);
        }
        // this.fileData = <File>fileInput.target.files;
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    submitForm(value:any) {
        const formData = new FormData();

        for (let index = 0; index < this.files.length; index++) {
            const element = this.files[index];
            formData.append('img', element);
        }
        // formData.append('img[]', element);

        this.prodSvc.uploadProductImages(this.product.id, formData).subscribe({
            next: (res) => {
                this.api.successToastr(res.message, 'Success Upload Images');
                this.selectedProduct.next(this.product);
            },
            error: this.api.errorHandler
        })
    }

    deleteImage(id: string) {
        this.prodSvc.removeProductImage(id).subscribe({
            next:(res) => {
                this.api.successToastr(res.message, 'Success Delete Image')
                this.selectedProduct.next(this.product);
            },
            error: this.api.errorHandler
        })
    }

}
