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
                this.menuForm.controls['menu_name'].setValue(res.menu_name);
                this.menuForm.controls['menu_icon'].setValue(res.menu_icon);
                this.menuForm.controls['menu_have_child'].setValue(
                    res.menu_have_child,
                );
                this.menuForm.controls['menu_is_active'].setValue(
                    res.menu_is_active,
                );
                this.menuForm.controls['frontend_url'].setValue(res.frontend_url);
                this.menuForm.controls['backend_url'].setValue(res.backend_url);

                if (res.menu_have_child) {
                    this.menuForm.controls['frontend_url'].disable();
                    this.menuForm.controls['backend_url'].disable();
                } else {
                    this.menuForm.controls['frontend_url'].enable();
                    this.menuForm.controls['backend_url'].enable();
                }
            },
            error: this.api.errorHandler,
        });
    }

    setForm() {
        this.menuForm = this.fb.group({
            menu_name: [null, Validators.required],
            menu_icon: [null, Validators.required],
            menu_have_child: [false, Validators.required],
            menu_is_active: [false, Validators.required],
            frontend_url: ['', Validators.required],
            backend_url: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.selectedMenu.unsubscribe();
    }

    disableUrl(eventTarget: any) {
        const boolVal = this.menuForm.controls['menu_have_child'].value;
        console.log(boolVal);

        if (!boolVal) {
            this.menuForm.controls['backend_url'].setValue(null);
            this.menuForm.controls['frontend_url'].setValue(null);
            this.menuForm.controls['backend_url'].disable();
            this.menuForm.controls['frontend_url'].disable();
        } else {
            this.menuForm.controls['backend_url'].enable();
            this.menuForm.controls['frontend_url'].enable();
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
