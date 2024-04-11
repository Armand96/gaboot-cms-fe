import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './interface/user';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { UserService } from './service/user.service';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { constCreateUser, constUpdateUser } from './const-user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
    constructor(
        private usrSvc: UserService,
        public api: ApiService,
    ) {}

    userObservable = new Observable<ResponseSuccess<User>>();
    users = [] as User[];
    hasLoadUser: boolean = false;

    selectedIdUser: string = "";
    selectedUser = new Subject<User>();
    operationMode: string = '';
    isOpenModalCru: boolean = false;
    isOpenModalDel: boolean = false;

    /* FILTER PARAMETER */
    totalData = 0;
    dataSearch: any = {
        page: 1,
        limit: 10,
        username: '',
        full_name: '',
    };

    ngOnInit(): void {
        this.userObservable = this.usrSvc.getUsers();
        this.search();
    }

    ngOnDestroy(): void {
        this.selectedUser.unsubscribe();
    }

    /* ====================================== */

    search() {
        const stringParams = this.api.searchParam(this.dataSearch);

        this.usrSvc.getUsers(stringParams).subscribe({
            next: (resp) => {
                this.users = resp.data;
                this.totalData = resp.totalData;
                this.hasLoadUser = true;
                // this.api.successToastr(resp.message, 'Success');
            },
            error: this.api.errorHandler,
        });
    }

    onPageChange(page: number) {
        this.dataSearch.page = page;
        this.search();
    }

    /* CREATE MODAL */
    create() {
        this.isOpenModalCru = true;
        this.operationMode = constCreateUser;
        this.selectedUser.next({} as User);
    }

    /* EDIT MODAL */
    edit(id: string) {
        this.selectedIdUser = id;
        this.usrSvc.getUser(id).subscribe({
            next: (res) => {
                this.selectedUser.next(res.datum);
                this.operationMode = constUpdateUser;
                this.isOpenModalCru = true;
            },
            error: this.api.errorHandler,
        });
    }

    /* OPEN DELETE MODAL */
    delete(user: User) {
        this.isOpenModalDel = true;
        this.selectedUser.next(user);
    }

    /* CLOSE MODAL CREATE UPDATE */
    pCloseModalCru(value: boolean) {
        this.isOpenModalCru = value;
        this.search();
    }

    /* CLOSE MODAL DELETE */
    pCloseModalDel(value: boolean) {
        this.isOpenModalDel = value;
        this.search();
    }
}
