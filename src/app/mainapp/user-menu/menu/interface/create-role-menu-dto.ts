import { CreateRoleSubmenuDto } from './create-role-submenu-dto';

export interface CreateRoleMenuDto {
    menuId: number;
    roleSubmenus: CreateRoleSubmenuDto;
    isChecked: boolean;
    create: boolean;
    read: boolean;
    updates: boolean;
    delete: boolean;
}
