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
                this.userForm.controls['username'].setValue(res.username);
                this.userForm.controls['email'].setValue(res.email);
                this.userForm.controls['firstname'].setValue(res.firstname);
                this.userForm.controls['lastname'].setValue(res.lastname);
                this.userForm.controls['is_active'].setValue(res.is_active);
                if (res.role_id != null)
                    this.userForm.controls['role_id'].setValue(res.role_id);
                else this.userForm.controls['role_id'].setValue(null);
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
            username: ['', Validators.required],
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: [''],
            role_id: [null, Validators.required],
            img: [null],
            is_active: [false],
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
        this.userForm.controls['img'].setValue("");
        this.fileData = {} as File;
    }

    submitForm(value: UserCreateDTO) {
        const formData = new FormData();

        formData.append('username', value.username);
        formData.append('email', value.email);
        formData.append('firstname', value.firstname);
        formData.append('lastname', value.lastname);
        formData.append('password', value.password);
        formData.append('is_active', String(value.is_active));
        formData.append('role_id', value.role_id.toString());
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

        this.fileData = {} as File;
        this.userForm.controls['img'].setValue("");
    }
}
