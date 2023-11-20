import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { RoleService } from '../../role/service/role.service';
import { constCreateUser } from '../const-user';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { RoleOnly } from '../../role/interface/role-only';
import { UserCreateDTO } from '../interface/user-create.dto';

@Component({
    selector: 'app-user-modal-create-update',
    templateUrl: './user-modal-create-update.component.html',
    styleUrls: ['./user-modal-create-update.component.css'],
})
export class UserModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private usrSvc: UserService,
        private roleSvc: RoleService,
        private fb: FormBuilder,
        private api: ApiService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedUser = new Subject<User>();
    @Output() modalEvent = new EventEmitter<boolean>();

    user = {} as User;
    roles = [] as RoleOnly[];
    hasLoadRole: boolean = false;
    userForm = {} as FormGroup;
    fileData = {} as File;

    ngOnInit(): void {
        this.setForm();

        this.selectedUser.subscribe({
            next: (res) => {
                this.user = res;
                this.userForm.controls['userName'].setValue(res.userName);
                this.userForm.controls['email'].setValue(res.email);
                this.userForm.controls['firstName'].setValue(res.firstName);
                this.userForm.controls['lastName'].setValue(res.lastName);
                this.userForm.controls['isActive'].setValue(res.isActive);
                if (res.roleId != null)
                    this.userForm.controls['roleId'].setValue(res.roleId);
                else this.userForm.controls['roleId'].setValue(null);
            },
            error: this.api.errorHandler,
        });

        this.roleSvc.getRoles().subscribe({
            next: (res) => {
                this.roles = res.data;
                this.hasLoadRole = true;
            },
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.selectedUser.unsubscribe();
    }

    setForm() {
        this.userForm = this.fb.group({
            userName: ['', Validators.required],
            email: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: [''],
            roleId: [null, Validators.required],
            img: [null],
            isActive: [false],
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    submitForm(value: UserCreateDTO) {
        const formData = new FormData();

        formData.append('userName', value.userName);
        formData.append('email', value.email);
        formData.append('firstName', value.firstName);
        formData.append('lastName', value.lastName);
        formData.append('password', value.password);
        formData.append('isActive', String(value.isActive));
        formData.append('roleId', value.roleId.toString());
        formData.append('img', this.fileData);

        if (this.textCreateUpdate == constCreateUser) {
            /* CREATE USER */
            this.usrSvc.createUser(formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            /* UPDATE USER */
            this.usrSvc.updateUser(this.user.id, formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Update');
                },
                error: this.api.errorHandler,
            });
        }
    }
}
