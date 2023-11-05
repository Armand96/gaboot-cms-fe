import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { RoleService } from '../service/role.service';
import { RoleOnly } from '../interface/role-only';

@Component({
  selector: 'app-role-modal-delete',
  templateUrl: './role-modal-delete.component.html',
  styleUrls: ['./role-modal-delete.component.css']
})
export class RoleModalDeleteComponent implements OnInit, OnDestroy {

  constructor(
    private api: ApiService,
    private roleSvc: RoleService
  ) { }

  @Input() isOpenedModal: boolean = false;
  @Input() Role = new Subject<RoleOnly>();
  @Output() modalEvent = new EventEmitter<boolean>();

  role = {} as RoleOnly;
  userHasLoad = false;

  ngOnDestroy(): void {
    this.Role.unsubscribe();
  }

  ngOnInit(): void {
    this.Role.subscribe({
      next: res => {
        this.role = res;
        this.userHasLoad = true;
      },
      error: this.api.errorHandler
    })
  }

  cCloseModal() {
    this.isOpenedModal = false;
    this.modalEvent.emit(false);
  }

  deleteRole() {
    this.roleSvc.deleteRole(this.role.id).subscribe({
      next: res => {
        this.api.successToastr(res.message, 'Delete Role');
        this.cCloseModal();
      },
      error: this.api.errorHandler
    });
  }
}
