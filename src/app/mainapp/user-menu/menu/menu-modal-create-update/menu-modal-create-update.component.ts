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
import { CreateMenuDto } from '../interface/create-menu-dto';
import { constCreateMenu } from '../menu.const';
import { MenuService } from '../service/menu.service';
import { Menu } from '../interface/menu';

@Component({
    selector: 'app-menu-modal-create-update',
    templateUrl: './menu-modal-create-update.component.html',
    styleUrls: ['./menu-modal-create-update.component.css'],
})
export class MenuModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private api: ApiService,
        private MenuSvc: MenuService,
        private fb: FormBuilder,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedMenu = new Subject<Menu>();
    @Output() modalEvent = new EventEmitter<boolean>();

    menuForm = {} as FormGroup;
    menu = {} as Menu;

    ngOnInit(): void {
        this.setForm();

        this.selectedMenu.subscribe({
            next: (res) => {
                this.menu = res;
                this.menuForm.controls['menuName'].setValue(res.menuName);
                this.menuForm.controls['menuIcon'].setValue(res.menuIcon);
                this.menuForm.controls['menuHaveChild'].setValue(
                    res.menuHaveChild,
                );
                this.menuForm.controls['menuIsActive'].setValue(
                    res.menuIsActive,
                );
                this.menuForm.controls['frontendUrl'].setValue(res.frontendUrl);
                this.menuForm.controls['backendUrl'].setValue(res.backendUrl);

                if (res.menuHaveChild) {
                    this.menuForm.controls['frontendUrl'].disable();
                    this.menuForm.controls['backendUrl'].disable();
                } else {
                    this.menuForm.controls['frontendUrl'].enable();
                    this.menuForm.controls['backendUrl'].enable();
                }
            },
            error: this.api.errorHandler,
        });
    }

    setForm() {
        this.menuForm = this.fb.group({
            menuName: [null, Validators.required],
            menuIcon: [null, Validators.required],
            menuHaveChild: [false, Validators.required],
            menuIsActive: [false, Validators.required],
            frontendUrl: ['', Validators.required],
            backendUrl: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.selectedMenu.unsubscribe();
    }

    disableUrl(eventTarget: any) {
        const boolVal = this.menuForm.controls['menuHaveChild'].value;
        console.log(boolVal);

        if (!boolVal) {
            this.menuForm.controls['backendUrl'].setValue(null);
            this.menuForm.controls['frontendUrl'].setValue(null);
            this.menuForm.controls['backendUrl'].disable();
            this.menuForm.controls['frontendUrl'].disable();
        } else {
            this.menuForm.controls['backendUrl'].enable();
            this.menuForm.controls['frontendUrl'].enable();
        }
        // console.log(eventTarget.value);
        // console.log();
    }

    submitForm(value: CreateMenuDto) {
        console.log(value);

        if (this.textCreateUpdate == constCreateMenu) {
            this.MenuSvc.createMenu(value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            this.MenuSvc.updateMenu(this.menu.id, value).subscribe({
                next: (res) =>
                    this.api.successToastr(res.message, 'Success Update'),
                error: this.api.errorHandler,
            });
        }
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }
}
