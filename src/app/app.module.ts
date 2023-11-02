import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './mainapp/root/root.component';
import { LoginComponent } from './mainapp/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { ApiService } from './mainapp/services/api/api.service';
import { JwtInterceptor } from './mainapp/services/api/jwt/jwt.interceptor';
import { LoadingComponent } from './mainapp/layout/loading/loading.component';
import { NotfoundComponent } from './mainapp/layout/notfound/notfound.component';
import { SidebarComponent } from './mainapp/layout/sidebar/sidebar.component';
import { TopnavbarComponent } from './mainapp/layout/topnavbar/topnavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    LoginComponent,
    LoadingComponent,
    NotfoundComponent,
    SidebarComponent,
    TopnavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    { provide: LOCALE_ID, useValue: "id-ID" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
