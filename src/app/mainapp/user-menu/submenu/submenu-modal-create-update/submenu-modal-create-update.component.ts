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
                this.submForm.controls['submenu_name'].setValue(res.submenu_name);
                this.submForm.controls['submenu_icon'].setValue(res.submenu_icon);
                this.submForm.controls['submenu_is_active'].setValue(
                    res.submenu_is_active,
                );
                this.submForm.controls['frontend_url'].setValue(res.frontend_url);
                this.submForm.controls['backend_url'].setValue(res.backend_url);
                this.submForm.controls['menu_id'].setValue(res.menu_id);
            },
            error: this.api.errorHandler,
        });
    }

    setForm() {
        this.submForm = this.fb.group({
            submenu_name: [null, Validators.required],
            submenu_icon: [null, Validators.required],
            submenu_is_active: [false, Validators.required],
            frontend_url: ['', Validators.required],
            backend_url: ['', Validators.required],
            menu_id: ['', Validators.required],
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
