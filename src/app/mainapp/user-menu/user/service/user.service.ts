import { Injectable } from '@angular/core';
import { ResponseSuccess } from 'src/app/mainapp/services/interfaces/response.dto';
import { User } from '../interface/user';
import { ApiService } from 'src/app/mainapp/services/api/api.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private api: ApiService) {}
    private baseUrl: string = 'user/';
    private baseUrl2: string = 'user';

    getUsers(params = '') {
        return this.api.getAPI<ResponseSuccess<User>>(this.baseUrl2 + params);
    }

    getUser(id: string) {
        return this.api.getAPI<ResponseSuccess<User>>(this.baseUrl + id);
    }

    createUser(formData: FormData) {
        return this.api.postAPI<ResponseSuccess<User>>(this.baseUrl, formData);
    }

    updateUser(id: string, formData: FormData) {
        return this.api.patchAPI<ResponseSuccess<User>>(
            this.baseUrl + id,
            formData,
        );
    }

    deleteUser(id: string) {
        return this.api.deleteAPI<ResponseSuccess<User>>(this.baseUrl + id);
    }
}
