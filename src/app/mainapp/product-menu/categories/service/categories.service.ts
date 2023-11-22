import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { AuthService } from 'src/app/mainapp/services/auth-service/auth.service';
import { ResponseSuccess } from 'src/app/mainapp/services/interfaces/response.dto';
import { Category } from '../interface/category';
import { CreateCategoryDto } from '../interface/category-create.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    constructor(
        private api: ApiService,
        private auth: AuthService,
    ) {}
    private baseUrl: string = 'categories/';
    private baseUrl2: string = 'categories';

    getCategories(params = '') {
        return this.api.getAPI<ResponseSuccess<Category>>(this.baseUrl2 + params);
    }

    getCategory(id: number) {
        return this.api.getAPI<ResponseSuccess<Category>>(this.baseUrl + id);
    }

    createCategory(data: FormData) {
        return this.api.postAPI<ResponseSuccess<Category>>(this.baseUrl, data);
    }

    updateCategory(id: number, data: FormData) {
        return this.api.patchAPI<ResponseSuccess<Category>>(
            this.baseUrl + id,
            data,
        );
    }

    deleteCategory(id: number) {
        return this.api.deleteAPI<ResponseSuccess<Category>>(this.baseUrl + id);
    }
}
