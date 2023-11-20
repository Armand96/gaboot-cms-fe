import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { SubmenuService } from '../service/submenu.service';
import { Submenu } from '../interface/submenu';

@Component({
    selector: 'app-submenu-modal-delete',
    templateUrl: './submenu-modal-delete.component.html',
    styleUrls: ['./submenu-modal-delete.component.css'],
})
export class SubmenuModalDeleteComponent implements OnInit, OnDestroy {
    constructor(
        private api: ApiService,
        private submSvc: SubmenuService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() Submenu = new Subject<Submenu>();
    @Output() modalEvent = new EventEmitter<boolean>();

    submenu = {} as Submenu;
    submenuHasLoad = false;

    ngOnInit(): void {
        this.Submenu.subscribe({
            next: (res) => {
                this.submenuHasLoad = true;
                this.submenu = res;
                console.log(res);
            },
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.Submenu.unsubscribe();
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    deleteSubmenu() {
        this.submSvc.deleteSubmenu(this.submenu.id).subscribe({
            next: (res) => {
                this.api.successToastr(res.message, 'Delete Submenu');
                this.cCloseModal();
            },
            error: this.api.errorHandler,
        });
    }
}
