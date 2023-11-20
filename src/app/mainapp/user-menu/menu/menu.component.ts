import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { constCreateMenu, constUpdateMenu } from './menu.const';
import { MenuService } from './service/menu.service';
import { Menu } from './interface/menu';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
    constructor(
        private api: ApiService,
        private menuSvc: MenuService,
    ) {}

    menus = [] as Menu[];
    hasLoad: boolean = false;
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;
    isOpenModalSubmenu: boolean = false;

    selectedMenu = new Subject<Menu>();
    selectedMenuIdForSub = new Subject<number>();

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        menuName: '',
    };

    ngOnInit(): void {
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedMenu.unsubscribe();
        this.selectedMenuIdForSub.unsubscribe();
    }

    /* ==================================================== */
    search() {
        const paramsString = this.api.searchParam(this.dataSearch);
        this.menuSvc.getMenus(paramsString).subscribe({
            next: (res) => {
                this.menus = res.data;
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
        this.isOpenModalCru = true;
        this.operationMode = constCreateMenu;
        this.selectedMenu.next({} as Menu);
    }

    edit(menuId: number) {
        this.menuSvc.getMenu(menuId).subscribe({
            next: (res) => {
                this.selectedMenu.next(res.datum);
                this.operationMode = constUpdateMenu;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    delete(menu: Menu) {
        this.isOpenModalDel = true;
        this.selectedMenu.next(menu);
    }

    openSub(menuId: number) {
        this.selectedMenuIdForSub.next(menuId);
        this.isOpenModalSubmenu = true;
    }

    /* ==================================================== */
    /* CLOSE MODAL CREATE UPDATE */
    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.menuSvc.getMenus().subscribe({
            next: (res) => {
                this.menus = res.data;
            },
            error: this.api.errorHandler,
        });
    }

    /* CLOSE MODAL DELETE */
    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.menuSvc.getMenus().subscribe({
            next: (res) => {
                this.menus = res.data;
            },
            error: this.api.errorHandler,
        });
    }

    pCloseModalSubm(value: boolean) {
        this.isOpenModalSubmenu = value;
    }
}
