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
import { CreateSubmenuDto } from '../interface/submenu-dto';
import { SubmenuService } from '../service/submenu.service';
import { constCreateSubmenu } from '../submenu.const';
import { Submenu } from '../interface/submenu';

@Component({
    selector: 'app-submenu-modal-create-update',
    templateUrl: './submenu-modal-create-update.component.html',
    styleUrls: ['./submenu-modal-create-update.component.css'],
})
export class SubmenuModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private api: ApiService,
        private submSvc: SubmenuService,
        private fb: FormBuilder,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedSubmenu = new Subject<Submenu>();
    @Output() modalEvent = new EventEmitter<boolean>();

    submForm = {} as FormGroup;
    subm = {} as Submenu;

    ngOnInit(): void {
        this.setForm();

        this.selectedSubmenu.subscribe({
            next: (res) => {
                this.subm = res;
                this.submForm.controls['submenuName'].setValue(res.submenuName);
                this.submForm.controls['submenuIcon'].setValue(res.submenuIcon);
                this.submForm.controls['submenuIsActive'].setValue(
                    res.submenuIsActive,
                );
                this.submForm.controls['frontendUrl'].setValue(res.frontendUrl);
                this.submForm.controls['backendUrl'].setValue(res.backendUrl);
                this.submForm.controls['menuId'].setValue(res.menuId);
            },
            error: this.api.errorHandler,
        });
    }

    setForm() {
        this.submForm = this.fb.group({
            submenuName: [null, Validators.required],
            submenuIcon: [null, Validators.required],
            submenuIsActive: [false, Validators.required],
            frontendUrl: ['', Validators.required],
            backendUrl: ['', Validators.required],
            menuId: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.selectedSubmenu.unsubscribe();
    }

    /* =========================================== */
    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    submitForm(value: CreateSubmenuDto) {
        console.log(value);

        if (this.textCreateUpdate == constCreateSubmenu) {
            this.submSvc.createSubmenu(value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create'),
                        this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            this.submSvc.updateSubmenu(this.subm.id, value).subscribe({
                next: (res) =>
                    this.api.successToastr(res.message, 'Success Update'),
                error: this.api.errorHandler,
            });
        }
    }
}
