import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { MenuService } from '../../menu/service/menu.service';
import { CreateRoleDto } from '../interface/create-role-dto';
import { constCreateRole } from '../role.const';
import { RoleService } from '../service/role.service';
import { RoleDetail } from '../interface/role-detail';
import { Menu } from '../../menu/interface/menu';

@Component({
    selector: 'app-role-modal-create-update',
    templateUrl: './role-modal-create-update.component.html',
    styleUrls: ['./role-modal-create-update.component.css'],
})
export class RoleModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private roleSvc: RoleService,
        private fb: FormBuilder,
        private api: ApiService,
        private menuSvc: MenuService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedRole = new Subject<RoleDetail>();
    @Output() modalEvent = new EventEmitter<boolean>();

    subscriptions = new Subscription();
    role = {} as RoleDetail;
    menus = [] as Menu[];
    hasLoadRole: boolean = false;
    roleForm = {} as FormGroup;

    ngOnInit(): void {
        this.setForm();

        this.initData();

        this.subscriptions.add(
            this.menuSvc.getMenus().subscribe({
                next: (res) => {
                    this.menus = res.data;

                    for (let index = 0; index < this.menus.length; index++) {
                        const element = this.menus[index];
                        this.addMenu(element.id);
                        // console.log(this.roleForm);

                        if (element.menuHaveChild) {
                            for (
                                let idxJ = 0;
                                idxJ < element.submenus.length;
                                idxJ++
                            ) {
                                const elm = element.submenus[idxJ];
                                // console.log('index submenu', index);
                                this.addSubmenus(index, elm.id, elm.menuId);
                            }
                        }
                    }

                    // console.log('done setting form menus', this.roleForm);
                },
                error: this.api.errorHandler,
            }),
        );
    }

    initData() {
        this.subscriptions.add(
            this.selectedRole.subscribe({
                next: (res) => {
                    this.role = res;

                    this.roleForm.controls['roleName'].setValue(res.roleName);

                    if (Array.isArray(res.menus)) {
                        res.menus.forEach((mn) => {
                            const index = this.roleForm.controls[
                                'roleMenus'
                            ].value.findIndex(
                                (item: any) => item.menuId == mn.menuId,
                            );
                            this.menuz()
                                .at(index)
                                .patchValue({ isChecked: true });

                            // console.log(mn);

                            if (mn.menu != null) {
                                this.menuz().at(index).patchValue({
                                    isChecked: true,
                                    createz: mn.menu.access.createz,
                                    readz: mn.menu.access.readz,
                                    updatez: mn.menu.access.updatez,
                                    deletez: mn.menu.access.deletez,
                                });
                            }

                            for (let idx = 0; idx < mn.submenus.length; idx++) {
                                const sm = mn.submenus[idx];
                                const subIndex = this.menuz()
                                    .at(index)
                                    .value.roleSubmenus.findIndex(
                                        (subItem: any) =>
                                            subItem.submenuId == sm.submenuId,
                                    );
                                // console.log(mn, sm)
                                this.submenusForm(index)
                                    .at(subIndex)
                                    .patchValue({
                                        isChecked: true,
                                        createz: sm.submenu.access.createz,
                                        readz: sm.submenu.access.readz,
                                        updatez: sm.submenu.access.updatez,
                                        deletez: sm.submenu.access.deletez,
                                    });
                                // console.log(this.submenusForm(index).at(subIndex))
                            }
                        });
                    }
                },
            }),
        );
    }

    ngOnDestroy(): void {
        this.selectedRole.unsubscribe();
        this.subscriptions.unsubscribe();
    }

    /* ========================================================== */

    setForm() {
        this.roleForm = this.fb.group({
            roleName: ['', Validators.required],
            roleMenus: this.fb.array([]),
        });
    }

    menuz(): FormArray {
        return this.roleForm.get('roleMenus') as FormArray;
    }

    newMenu(menuId: number): FormGroup {
        return this.fb.group({
            isChecked: false,
            menuId: menuId,
            createz: false,
            readz: false,
            updatez: false,
            deletez: false,
            roleSubmenus: this.fb.array([]),
        });
    }

    addMenu(menuId: number) {
        this.menuz().push(this.newMenu(menuId));
    }

    submenusForm(menuIndex: number): FormArray {
        return this.menuz().at(menuIndex).get('roleSubmenus') as FormArray;
    }

    newSubmenu(submenuId: number, menuId: number): FormGroup {
        return this.fb.group({
            isChecked: false,
            submenuId: submenuId,
            menuId: menuId,
            createz: '',
            readz: '',
            updatez: '',
            deletez: '',
        });
    }

    addSubmenus(menuIndex: number, submenuId: number, menuId: number) {
        this.submenusForm(menuIndex).push(this.newSubmenu(submenuId, menuId));
    }

    /* =========================================================== */

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
    }

    submitForm(value: CreateRoleDto) {
        if (this.textCreateUpdate == constCreateRole) {
            /* CREATE USER */
            this.roleSvc.createRoleDetail(value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.roleForm.reset();
                },
                error: this.api.errorHandler,
            });
        } else {
            /* UPDATE USER */
            this.roleSvc.updateRoleDetail(this.role.id, value).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Update');
                },
                error: this.api.errorHandler,
            });
        }
    }
}
