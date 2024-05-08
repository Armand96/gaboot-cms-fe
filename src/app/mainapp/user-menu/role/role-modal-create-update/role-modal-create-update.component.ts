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

                        if (element.menu_have_child) {
                            for (
                                let idxJ = 0;
                                idxJ < element.submenus.length;
                                idxJ++
                            ) {
                                const elm = element.submenus[idxJ];
                                // console.log('index submenu', index);
                                this.addSubmenus(index, elm.id, elm.menu_id);
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
                    // console.log("RESPONSE", res);

                    this.role = res;

                    this.roleForm.controls['role_name'].setValue(res.role_name);

                    if (Array.isArray(res.menus)) {
                        res.menus.forEach((mn) => {
                            const index = this.roleForm.controls[
                                'role_menus'
                            ].value.findIndex(
                                (item: any) => item.menu_id == mn.menu_id,
                            );
                            this.menuz()
                                .at(index)
                                .patchValue({ is_checked: true });

                            console.log("MEEENU",mn);

                            if (mn.menu != null) {
                                this.menuz().at(index).patchValue({
                                    is_checked: true,
                                    create_access: mn.menu.access[0].create_access,
                                    read_access: mn.menu.access[0].read_access,
                                    update_access: mn.menu.access[0].update_access,
                                    delete_access: mn.menu.access[0].delete_access,
                                });
                            }

                            for (let idx = 0; idx < mn.submenus.length; idx++) {
                                const sm = mn.submenus[idx];
                                const subIndex = this.menuz()
                                    .at(index)
                                    .value.role_submenus.findIndex(
                                        (subItem: any) =>
                                            subItem.submenu_id == sm.submenu_id,
                                    );
                                // console.log("MENU", mn);
                                this.submenusForm(index)
                                    .at(subIndex)
                                    .patchValue({
                                        is_checked: true,
                                        create_access: sm.submenu.access.create_access,
                                        read_access: sm.submenu.access.read_access,
                                        update_access: sm.submenu.access.update_access,
                                        delete_access: sm.submenu.access.delete_access,
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
            role_name: ['', Validators.required],
            role_menus: this.fb.array([]),
        });
    }

    preStartForm(){
        for (let index = 0; index < this.menus.length; index++) {
            const element = this.menus[index];
            this.addMenu(element.id);
            // console.log(this.roleForm);

            if (element.menu_have_child) {
                for (
                    let idxJ = 0;
                    idxJ < element.submenus.length;
                    idxJ++
                ) {
                    const elm = element.submenus[idxJ];
                    // console.log('index submenu', index);
                    this.addSubmenus(index, elm.id, elm.menu_id);
                }
            }
        }
    }

    menuz(): FormArray {
        return this.roleForm.get('role_menus') as FormArray;
    }

    newMenu(menu_id: string): FormGroup {
        return this.fb.group({
            is_checked: false,
            menu_id: menu_id,
            create_access: false,
            read_access: false,
            update_access: false,
            delete_access: false,
            role_submenus: this.fb.array([]),
        });
    }

    addMenu(menu_id: string) {
        this.menuz().push(this.newMenu(menu_id));
    }

    submenusForm(menuIndex: number): FormArray {
        return this.menuz().at(menuIndex).get('role_submenus') as FormArray;
    }

    newSubmenu(submenuId: string, menu_id: string): FormGroup {
        return this.fb.group({
            is_checked: false,
            submenu_id: submenuId,
            menu_id: menu_id,
            create_access: '',
            read_access: '',
            update_access: '',
            delete_access: '',
        });
    }

    addSubmenus(menuIndex: number, submenuId: string, menu_id: string) {
        this.submenusForm(menuIndex).push(this.newSubmenu(submenuId, menu_id));
    }

    /* =========================================================== */

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
        this.setForm();
        this.preStartForm();
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
