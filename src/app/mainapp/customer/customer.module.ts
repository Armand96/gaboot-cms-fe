import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class CustomerModule { }
