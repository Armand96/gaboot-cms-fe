import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesModalCreateUpdateComponent } from './categories-modal-create-update/categories-modal-create-update.component';
import { CategoriesModalDeleteComponent } from './categories-modal-delete/categories-modal-delete.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesModalCreateUpdateComponent,
    CategoriesModalDeleteComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
