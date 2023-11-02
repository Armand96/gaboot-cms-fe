import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth-service/auth.service';
import { LoginDto } from '../services/auth-service/interfaces/login-dto';
import { LoginResponse } from '../services/auth-service/interfaces/login-response';
import { User } from '../user-menu/user/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  /* VARIABEL */
  users: User[] = [];
  user = {} as User;
  loginForm = {} as FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {

  }

  async login(data: LoginDto) {
    // console.log(data);
    this.auth.login(data).subscribe({
      next: this.successResponseLogin,
      error: this.api.errorHandler
    });
  }

  successResponseLogin = (resp: LoginResponse) => {
    this.api.successToastr('Success Login', 'Success');
    this.auth.setLocalStorageToken(resp.accessToken);
    this.router.navigateByUrl('/');
  }

  checkAuth() {
    this.auth.checkLogin();
  }
}
