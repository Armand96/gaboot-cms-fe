import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { BannerModalCreateUpdateComponent } from './banner-modal-create-update/banner-modal-create-update.component';
import { BannerModalDeleteComponent } from './banner-modal-delete/banner-modal-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    BannerComponent,
    BannerModalCreateUpdateComponent,
    BannerModalDeleteComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BannerModule { }
