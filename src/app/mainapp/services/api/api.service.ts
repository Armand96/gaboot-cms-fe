import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
        public toastr: ToastrService,
        private router: Router,
    ) {}

    public baseUrl: string = 'http://localhost:3000/';
    public imageUrl: string = this.baseUrl+'images?image=';

    getAPI<T>(url: string, headers?: HttpHeaders) {
        return this.http.get<T>(this.baseUrl + url, { headers: headers });
    }

    postAPI<T>(url: string, data: any, headers?: HttpHeaders) {
        return this.http.post<T>(this.baseUrl + url, data, {
            headers: headers,
        });
    }

    patchAPI<T>(url: string, data: any, headers?: HttpHeaders) {
        return this.http.patch<T>(this.baseUrl + url, data, {
            headers: headers,
        });
    }

    deleteAPI<T>(url: string, headers?: HttpHeaders) {
        return this.http.delete<T>(this.baseUrl + url, { headers: headers });
    }

    click() {
        this.toastr.info('test', 'test');
    }

    successToastr = (message: string, title: string) => {
        this.toastr.success(message, title, { timeOut: 5000 });
    };

    errorHandler = (error: HttpErrorResponse) => {
        console.log(error, this.toastr);

        let listErrMsg = '';
        if (
            error.error.message != undefined &&
            Array.isArray(error.error.message)
        ) {
            error.error.message.forEach((elm: string) => {
                listErrMsg += ' ' + elm;
            });
        } else if (error.error.message) {
            listErrMsg = error.error.message;
        } else {
            listErrMsg = error.statusText;
        }

        this.toastr.error(listErrMsg, error.statusText, {
            timeOut: 5000,
        });

        /* UNATHORIZED */
        // console.log("ERROR SERVICE", error);
        if (error.status == 401 && error.error.message == "JWT Expired") {
            localStorage.clear();
            this.router.navigateByUrl('/login');
        }
    };

    /* CONVERT OBJECT TO GET PARAMS */
    searchParam(dataSearch: any) {
        let stringParams = '?';

        for (const property in dataSearch) {
            stringParams += `${property}=${dataSearch[property]}&`;
        }
        stringParams = stringParams.slice(0, -1);
        return stringParams;
    }
}
