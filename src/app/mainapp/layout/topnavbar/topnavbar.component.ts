import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../user-menu/user/service/user.service';
import { User } from '../../user-menu/user/interface/user';
import { RoleOnly } from '../../user-menu/role/interface/role-only';
import { UserCreateDTO } from '../../user-menu/user/interface/user-create.dto';

@Component({
    selector: 'app-topnavbar',
    templateUrl: './topnavbar.component.html',
    styleUrls: ['./topnavbar.component.css'],
})
export class TopnavbarComponent implements OnInit, OnDestroy {
    constructor(
        public api: ApiService,
        private usrSvc: UserService,
        private fb: FormBuilder,
        private auth: AuthService,
    ) {}
    @Input() user = {} as User;
    selectedUser = new Subject<User>();
    operationMode: string = '';
    textCreateUpdate: string = '';
    isOpenedModal = false;

    ngOnInit(): void {
        this.setForm();
        this.selectedUser.subscribe({
            next: (resp) => (this.user = resp),
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.selectedUser.unsubscribe();
    }

    /* ========================== */
    roles = [] as RoleOnly[];
    hasLoadRole: boolean = false;
    userForm = {} as FormGroup;
    fileData = {} as File;

    setForm() {
        this.userForm = this.fb.group({
            userName: [''],
            firstName: [''],
            lastName: [''],
            password: [''],
            roleId: [null],
            img: [null],
            isActive: [false],
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    openModal() {
        this.isOpenedModal = true;
        this.userForm.controls['userName'].setValue(this.user.userName);
        this.userForm.controls['firstName'].setValue(this.user.firstName);
        this.userForm.controls['lastName'].setValue(this.user.lastName);
        this.userForm.controls['isActive'].setValue(this.user.isActive);
        if (this.user.roleId != null)
            this.userForm.controls['roleId'].setValue(this.user.roleId);
        else this.userForm.controls['roleId'].setValue(null);
    }

    logout() {
        this.auth.logout();
    }

    closeModal() {
        this.isOpenedModal = false;
    }

    submitForm(value: UserCreateDTO) {
        const formData = new FormData();

        formData.append('userName', value.userName);
        formData.append('firstName', value.firstName);
        formData.append('lastName', value.lastName);
        formData.append('password', value.password);
        formData.append('isActive', String(value.isActive));
        formData.append('roleId', value.roleId.toString());
        formData.append('img', this.fileData);

        /* UPDATE USER */
        this.usrSvc.updateUser(this.user.id, formData).subscribe({
            next: (res) => {
                this.api.successToastr(res.message, 'Success Update');
                this.user = res.datum;
            },
            error: this.api.errorHandler,
        });
    }
}
