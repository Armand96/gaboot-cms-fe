import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { constCreateBanner, constUpdateBanner } from './banner.const';
import { Banner } from './interface/banner';
import { BannerService } from './service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {

    constructor(
        public api: ApiService,
        private bannerSvc: BannerService,
    ) {}

    banners = [] as Banner[];
    hasLoad: boolean = false;
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;
    selectedBanner = new Subject<Banner>();

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        name: '',
    };

    ngOnInit(): void {
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedBanner.unsubscribe();
    }

    /* ==================================================== */
    search() {
        const paramsString = this.api.searchParam(this.dataSearch);
        this.bannerSvc.getBanner(paramsString).subscribe({
            next: (res) => {
                this.banners = res.data;
                this.hasLoad = true;
                this.totalData = res.totalData;
                this.api.successToastr(res.message, 'Success');
            },
            error: this.api.errorHandler,
        });
    }

    onPageChange(page: number) {
        this.dataSearch.page = page;
        this.search();
    }

    create() {
        // console.log('pressed');
        this.isOpenModalCru = true;
        this.operationMode = constCreateBanner;
        this.selectedBanner.next({} as Banner);
    }

    edit(bannerId: string) {
        this.bannerSvc.getBanner(bannerId).subscribe({
            next: (res) => {
                this.selectedBanner.next(res.datum);
                this.operationMode = constUpdateBanner;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    delete(banner: Banner) {
        this.isOpenModalDel = true;
        this.selectedBanner.next(banner);
    }

    /* ==================================================== */
    /* CLOSE MODAL CREATE UPDATE */
    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.bannerSvc.getBanners().subscribe({
            next: (res) => {
                this.banners = res.data;
            },
            error: this.api.errorHandler,
        });
    }

    /* CLOSE MODAL DELETE */
    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.bannerSvc.getBanners().subscribe({
            next: (res) => {
                this.banners = res.data;
            },
            error: this.api.errorHandler,
        });
    }

}
