import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleModalCreateUpdateComponent } from './role-modal-create-update/role-modal-create-update.component';
import { RoleModalDeleteComponent } from './role-modal-delete/role-modal-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        RoleComponent,
        RoleModalCreateUpdateComponent,
        RoleModalDeleteComponent,
    ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
})
export class RoleModule {}
