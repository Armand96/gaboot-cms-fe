import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserModalCreateUpdateComponent } from './user-modal-create-update/user-modal-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModalDeleteComponent } from './user-modal-delete/user-modal-delete.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        UserComponent,
        UserModalCreateUpdateComponent,
        UserModalDeleteComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
})
export class UserModule {}
