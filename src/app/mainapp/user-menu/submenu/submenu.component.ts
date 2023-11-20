import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { SubmenuService } from './service/submenu.service';
import { constCreateSubmenu, constUpdateSubmenu } from './submenu.const';
import { Submenu } from './interface/submenu';

@Component({
    selector: 'app-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css'],
})
export class SubmenuComponent implements OnInit, OnDestroy {
    constructor(
        private api: ApiService,
        private submSvc: SubmenuService,
    ) {}

    operationMode: string = '';
    submenus: Submenu[] = [];
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;
    selectedSubmenu = new Subject<Submenu>();
    menuId = 0;

    @Input() isOpenedModal: boolean = false;
    @Input() selectedMenuId = new Subject<number>();
    @Output() modalEvent = new EventEmitter<boolean>();

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        userName: '',
        fullName: '',
    };

    ngOnInit(): void {
        this.selectedMenuId.subscribe({
            next: this.loadSubmData,
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.selectedMenuId.unsubscribe();
    }

    /* ================================ */
    onPageChange(page: number) {
        this.dataSearch.page = page;
        this.loadSubmData(this.menuId);
    }

    loadSubmData = (menuId: number) => {
        this.menuId = menuId;

        const paramsString = this.api.searchParam(this.dataSearch);
        this.submSvc.getSubmenusByMenuId(menuId, paramsString).subscribe({
            next: (res) => {
                this.submenus = res.data;
                this.totalData = res.totalData;
            },
            error: this.api.errorHandler,
        });
    };

    create() {
        this.isOpenModalCru = true;
        this.operationMode = constCreateSubmenu;
        this.selectedSubmenu.next({ menuId: this.menuId } as Submenu);
    }

    edit(id: number) {
        this.submSvc.getSubmenu(id).subscribe({
            next: (res) => {
                this.selectedSubmenu.next(res.datum);
                this.operationMode = constUpdateSubmenu;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    delete(subm: Submenu) {
        this.isOpenModalDel = true;
        this.selectedSubmenu.next(subm);
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.submSvc.getSubmenusByMenuId(this.menuId).subscribe({
            next: (res) => {
                this.submenus = res.data;
                // console.log('abis create / update');
            },
            error: this.api.errorHandler,
        });
    }

    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.submSvc.getSubmenusByMenuId(this.menuId).subscribe({
            next: (res) => {
                this.submenus = res.data;
            },
            error: this.api.errorHandler,
        });
    }
}
