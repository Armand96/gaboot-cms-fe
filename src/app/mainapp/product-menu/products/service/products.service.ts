import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { ResponseSuccess } from '../../../services/interfaces/response.dto';
import { Product } from '../interface/product';
import { Category } from '../../categories/interface/category';
import { ProductCreateDto } from '../interface/product-create.dto';
import { ProductImage } from '../interface/product-images';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private api: ApiService) { }
    private baseUrl: string = 'products/';
    private baseUrl2: string = 'products';
    private prodImg: string = "productImages/";

    getProducts(params = '') {
        return this.api.getAPI<ResponseSuccess<Product>>(
            this.baseUrl2 + params,
        );
    }

    getProduct(id: string) {
        return this.api.getAPI<ResponseSuccess<Product>>(this.baseUrl + id);
    }

    getCategories() {
        return this.api.getAPI<ResponseSuccess<Category>>(this.baseUrl + 'categories');
    }

    createProduct(data: ProductCreateDto) {
        return this.api.postAPI<ResponseSuccess<Product>>(
            this.baseUrl,
            data,
        );
    }

    updateProduct(id: string, data: ProductCreateDto) {
        return this.api.patchAPI<ResponseSuccess<Product>>(
            this.baseUrl + id,
            data,
        );
    }

    deleteProduct(id: string) {
        return this.api.deleteAPI<ResponseSuccess<Product>>(this.baseUrl + id);
    }

    /* ====================================== */
    getProductImages(productId: string) {
        return this.api.getAPI<ResponseSuccess<ProductImage>>(this.baseUrl + this.prodImg + productId);
    }

    uploadProductImages(id: string, formData: FormData) {
        return this.api.postAPI<ResponseSuccess<Product>>(this.baseUrl + this.prodImg + id, formData);
    }

    removeProductImage(idImage: string) {
        return this.api.deleteAPI<ResponseSuccess<Product>>(this.baseUrl + this.prodImg + idImage);
    }
}
