import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { Banner } from '../interface/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

    constructor(
        private api: ApiService,
        private auth: AuthService,
    ) {}
    private baseUrl: string = 'banner/';
    private baseUrl2: string = 'banner';

    getBanners(params = '') {
        return this.api.getAPI<ResponseSuccess<Banner>>(this.baseUrl2 + params);
    }

    getBanner(id: string) {
        return this.api.getAPI<ResponseSuccess<Banner>>(this.baseUrl + id);
    }

    createBanner(data: FormData) {
        return this.api.postAPI<ResponseSuccess<Banner>>(this.baseUrl, data);
    }

    updateBanner(id: string, data: FormData) {
        return this.api.patchAPI<ResponseSuccess<Banner>>(
            this.baseUrl + id,
            data,
        );
    }

    deleteBanner(id: string) {
        return this.api.deleteAPI<ResponseSuccess<Banner>>(this.baseUrl + id);
    }
}
