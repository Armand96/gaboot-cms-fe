import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuModalCreateUpdateComponent } from './menu-modal-create-update/menu-modal-create-update.component';
import { MenuModalDeleteComponent } from './menu-modal-delete/menu-modal-delete.component';
import { SubmenuComponent } from '../submenu/submenu.component';
import { SubmenuModalCreateUpdateComponent } from '../submenu/submenu-modal-create-update/submenu-modal-create-update.component';
import { SubmenuModalDeleteComponent } from '../submenu/submenu-modal-delete/submenu-modal-delete.component';

@NgModule({
    declarations: [
        MenuComponent,
        MenuModalCreateUpdateComponent,
        MenuModalDeleteComponent,
        SubmenuComponent,
        SubmenuModalCreateUpdateComponent,
        SubmenuModalDeleteComponent,
    ],
    imports: [
        CommonModule,
        MenuRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
})
export class MenuModule {}
