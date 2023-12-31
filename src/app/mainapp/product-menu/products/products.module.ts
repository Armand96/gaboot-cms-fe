import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductsModalCreateUpdateComponent } from './products-modal-create-update/products-modal-create-update.component';
import { ProductsModalDeleteComponent } from './products-modal-delete/products-modal-delete.component';
import { ProductsImagesComponent } from './products-images/products-images.component';

@NgModule({
    declarations: [ProductsComponent, ProductsModalCreateUpdateComponent, ProductsModalDeleteComponent, ProductsImagesComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ProductsRoutingModule
    ],
})
export class ProductsModule {}
