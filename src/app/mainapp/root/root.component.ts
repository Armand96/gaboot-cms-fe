import { Component } from '@angular/core';
import { ResponseSuccess } from '../services/interfaces/response.dto';
import { User } from '../user-menu/user/interface/user';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private apiSvc: ApiService
  ) { }

  public userData = {} as User;
  public obs = new Observable<ResponseSuccess<User>>();
  sbj = new Subject<User>();

  async ngOnInit() {
    let isLoggedIn = false;

    this.obs = this.authSvc.checkLogin();

    this.obs.subscribe({
      next: (resp) => {
        console.log('response', resp);

        if (resp) isLoggedIn = true;
        else isLoggedIn = false
        if(!isLoggedIn) this.router.navigateByUrl('/login');

        this.userData = resp.datum;
        this.sbj.next(this.userData);
        this.sbj.unsubscribe();
      },
      error: this.apiSvc.errorHandler
    });

  }

  ngOnDestroy(): void {
    this.sbj.unsubscribe();
  }
}
