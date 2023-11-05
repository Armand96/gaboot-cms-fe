import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { RoleService } from './service/role.service';
import { RoleOnly } from './interface/role-only';
import { RoleDetail } from './interface/role-detail';
import { constCreateRole, constUpdateRole } from './role.const';
import { ResponseSuccess } from '../../services/interfaces/response.dto';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {

  constructor(
    private roleSvc: RoleService,
    public api: ApiService
  ) { }

  // subscriptions: Subscription = new Subscription();
  roles = [] as RoleOnly[];
  hasLoadRole: boolean = false;

  selectedIdUser: number = 0;
  selectedRole = new Subject<RoleDetail>();
  deletedRole = new Subject<RoleOnly>();
  operationMode: string = '';
  isOpenModalCru: boolean = false;
  isOpenModalDel: boolean = false;

  /* FILTER PARAMETER */
  totalData = 0;
  dataSearch: any = {
    page: 1,
    limit: 10,
    roleName: ""
  };

  ngOnInit(): void {
    this.roleSvc.getRoles().subscribe({
      next: this.respond,
      error: this.api.errorHandler,
    })
  }

  ngOnDestroy(): void {
    this.selectedRole.unsubscribe();
    this.deletedRole.unsubscribe();
  }

  /* ===================================================================================== */

  search() {

    let stringParams = this.api.searchParam(this.dataSearch);
    this.roleSvc.getRoles(stringParams).subscribe({
      next: this.respond,
      error: this.api.errorHandler,
    })
  }

  onPageChange(page: number) {
    this.dataSearch.page = page;
    this.search();
  }

  /* CREATE MODAL */
  create() {
    this.isOpenModalCru = true;
    this.operationMode = constCreateRole;
    this.selectedRole.next({} as RoleDetail);
  }

  /* EDIT MODAL */
  edit(id: number) {
    this.selectedIdUser = id;
    this.roleSvc.getRole(id).subscribe({
      next: res => {
        this.selectedRole.next(res.datum);
        this.operationMode = constUpdateRole;
        this.isOpenModalCru = true;
      },
      error: this.api.errorHandler
    })
  }

  /* OPEN DELETE MODAL */
  delete(role: RoleOnly) {
    this.isOpenModalDel = true;
    this.deletedRole.next(role);
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

  respond = (res: ResponseSuccess<RoleOnly>) => {
    this.roles = res.data;
    this.totalData = res.totalData;;
    this.hasLoadRole = true;
    // this.api.successToastr(res.message, 'Success');
  }
}
