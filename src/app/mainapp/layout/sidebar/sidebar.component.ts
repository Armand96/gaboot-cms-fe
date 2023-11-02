import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ResponseSuccess } from '../../services/interfaces/response.dto';
import { User } from '../../user-menu/user/interface/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() observe = new Observable<ResponseSuccess<User>>()
  @Input() subjs = new Subject<User>();
  @Input() user = {} as User;
  hasLoad: boolean = false;
  sameUrl: boolean = false;
  currentMenuId: number = 0;
  isDrawerOpen: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.subjs.subscribe(
      (resp) => {
        this.user = resp;
        let accesses = this.user.role.access;

        for (let index = 0; index < accesses.length; index++) {
          const element = accesses[index];

          if (this.router.url == element.frontendUrl) {
            this.sameUrl = true;
            this.currentMenuId = element.menuId;
            // console.log(this.currentMenuId, element.menuId)
            break;
          }
        }

        this.hasLoad = true;
        console.log('check sidebar');

        this.subjs.unsubscribe();
      }
    );
  }

  ngOnDestroy(): void {
    this.subjs.unsubscribe();
  }

  afterClickMenu(menuId: number) {
    this.isDrawerOpen = false;
    this.currentMenuId = menuId;
  }

  home() {
    this.isDrawerOpen = false;
    this.currentMenuId = 0;
  }
}
