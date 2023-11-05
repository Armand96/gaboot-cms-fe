import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { MenuService } from '../service/menu.service';
import { Menu } from '../interface/menu';

@Component({
  selector: 'app-menu-modal-delete',
  templateUrl: './menu-modal-delete.component.html',
  styleUrls: ['./menu-modal-delete.component.css']
})
export class MenuModalDeleteComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private menuSvc: MenuService
  ) { }

  @Input() isOpenedModal: boolean = false;
  @Input() Menu = new Subject<Menu>();
  @Output() modalEvent = new EventEmitter<boolean>();

  menu = {} as Menu;
  menuHasLoad = false;

  ngOnInit(): void {
    this.Menu.subscribe({
      next: res => {
        this.menu = res;
        this.menuHasLoad = true;
      },
      error: this.api.errorHandler
    })
  }

  ngOnDestroy(): void {
    this.Menu.unsubscribe();
  }

  cCloseModal() {
    this.isOpenedModal = false;
    this.modalEvent.emit(false);
  }

  deleteMenu() {
    this.menuSvc.deleteMenu(this.menu.id).subscribe({
      next: res => {
        this.api.successToastr(res.message, 'Delete Menu');
        this.cCloseModal();
      },
      error: this.api.errorHandler
    })
  }

}
