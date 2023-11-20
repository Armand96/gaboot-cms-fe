import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';

@Component({
    selector: 'app-user-modal-delete',
    templateUrl: './user-modal-delete.component.html',
    styleUrls: ['./user-modal-delete.component.css'],
})
export class UserModalDeleteComponent {
    constructor(
        private api: ApiService,
        private usrSvc: UserService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() User = new Subject<User>();
    @Output() modalEvent = new EventEmitter<boolean>();

    user = {} as User;
    userHasLoad = false;

    ngOnInit(): void {
        this.User.subscribe({
            next: (res) => {
                this.user = res;
                this.userHasLoad = true;
            },
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.User.unsubscribe();
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    deleteUser() {
        this.usrSvc.deleteUser(this.user.id).subscribe({
            next: (res) => {
                this.api.successToastr(res.message, 'Delete User');
                this.cCloseModal();
            },
            error: this.api.errorHandler,
        });
    }
}
