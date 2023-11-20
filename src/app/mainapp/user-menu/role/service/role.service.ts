import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { AuthService } from 'src/app/mainapp/services/auth-service/auth.service';
import { ResponseSuccess } from 'src/app/mainapp/services/interfaces/response.dto';
import { Role } from '../interface/role';
import { RoleDetail } from '../interface/role-detail';
import { CreateRoleDto } from '../interface/create-role-dto';
import { RoleOnly } from '../interface/role-only';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(
        private api: ApiService,
        private auth: AuthService,
    ) {}

    private baseUrl: string = 'role/';
    private baseUrl2: string = 'role';

    getRoles(params = '') {
        return this.api.getAPI<ResponseSuccess<RoleOnly>>(
            this.baseUrl2 + params,
        );
    }

    getRole(id: number) {
        return this.api.getAPI<ResponseSuccess<RoleDetail>>(this.baseUrl + id);
    }

    createRole(data: CreateRoleDto) {
        return this.api.postAPI<ResponseSuccess<Role>>(this.baseUrl, data);
    }

    createRoleDetail(data: CreateRoleDto) {
        return this.api.postAPI<ResponseSuccess<Role>>(
            this.baseUrl + 'new',
            data,
        );
    }

    updateRole(id: number, data: CreateRoleDto) {
        return this.api.patchAPI<ResponseSuccess<Role>>(
            this.baseUrl + id,
            data,
        );
    }

    updateRoleDetail(id: number, data: CreateRoleDto) {
        return this.api.patchAPI<ResponseSuccess<Role>>(
            this.baseUrl + 'update/' + id,
            data,
        );
    }

    deleteRole(id: number) {
        return this.api.deleteAPI<ResponseSuccess<Role>>(this.baseUrl + id);
    }
}
