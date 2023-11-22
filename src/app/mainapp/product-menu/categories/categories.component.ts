import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { Category } from './interface/category';
import { CategoriesService } from './service/categories.service';
import { constCreateCategory, constUpdateCategory } from './categories.const';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    constructor(
        public api: ApiService,
        private categorySvc: CategoriesService,
    ) {}

    categories = [] as Category[];
    hasLoad: boolean = false;
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;

    selectedCategory = new Subject<Category>();

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        categoryName: '',
    };

    ngOnInit(): void {
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedCategory.unsubscribe();
    }

    /* ==================================================== */
    search() {
        const paramsString = this.api.searchParam(this.dataSearch);
        this.categorySvc.getCategories(paramsString).subscribe({
            next: (res) => {
                this.categories = res.data;
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
        this.operationMode = constCreateCategory;
        this.selectedCategory.next({} as Category);
    }

    edit(categoryId: number) {
        this.categorySvc.getCategory(categoryId).subscribe({
            next: (res) => {
                this.selectedCategory.next(res.datum);
                this.operationMode = constUpdateCategory;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    delete(category: Category) {
        this.isOpenModalDel = true;
        this.selectedCategory.next(category);
    }

    /* ==================================================== */
    /* CLOSE MODAL CREATE UPDATE */
    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.categorySvc.getCategories().subscribe({
            next: (res) => {
                this.categories = res.data;
            },
            error: this.api.errorHandler,
        });
    }

    /* CLOSE MODAL DELETE */
    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.categorySvc.getCategories().subscribe({
            next: (res) => {
                this.categories = res.data;
            },
            error: this.api.errorHandler,
        });
    }

}