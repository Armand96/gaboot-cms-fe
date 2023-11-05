import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api: ApiService) { }
  private baseUrl: string = "product/";
  private baseUrl2: string = "product";

  getProducts(params = "") {
    return this.api.getAPI<ResponseSuccess<Product>>(this.baseUrl2 + params);
  }

  getProduct(id: number) {
    return this.api.getAPI<ResponseSuccess<Product>>(this.baseUrl + id);
  }

  createProduct(formData: FormData) {
    return this.api.postAPI<ResponseSuccess<Product>>(this.baseUrl, formData);
  }

  updateProduct(id: number, formData: FormData) {
    return this.api.patchAPI<ResponseSuccess<Product>>(this.baseUrl + id, formData);
  }

  deleteProduct(id: number) {
    return this.api.deleteAPI<ResponseSuccess<Product>>(this.baseUrl + id);
  }
}
