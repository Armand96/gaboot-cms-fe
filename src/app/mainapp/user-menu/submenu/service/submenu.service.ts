import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { AuthService } from 'src/app/mainapp/services/auth-service/auth.service';
import { CreateSubmenuDto } from '../interface/submenu-dto';
import { ResponseSuccess } from 'src/app/mainapp/services/interfaces/response.dto';
import { Submenu } from '../interface/submenu';

@Injectable({
    providedIn: 'root',
})
export class SubmenuService {
    constructor(
        private api: ApiService,
        private auth: AuthService,
    ) {}
    private baseUrl: string = 'submenu/';
    private baseUrl2: string = 'submenu';

    getSubmenus() {
        return this.api.getAPI<ResponseSuccess<Submenu>>(this.baseUrl);
    }

    getSubmenu(id: string) {
        return this.api.getAPI<ResponseSuccess<Submenu>>(this.baseUrl + id);
    }

    getSubmenusByMenuId(menuId: string, params = '') {
        return this.api.getAPI<ResponseSuccess<Submenu>>(
            this.baseUrl + 'menu/' + menuId + params,
        );
    }

    createSubmenu(data: CreateSubmenuDto) {
        return this.api.postAPI<ResponseSuccess<Submenu>>(this.baseUrl, data);
    }

    updateSubmenu(id: string, data: CreateSubmenuDto) {
        return this.api.patchAPI<ResponseSuccess<Submenu>>(
            this.baseUrl + id,
            data,
        );
    }

    deleteSubmenu(id: string) {
        return this.api.deleteAPI<ResponseSuccess<Submenu>>(this.baseUrl + id);
    }
}
