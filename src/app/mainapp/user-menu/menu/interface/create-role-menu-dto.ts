import { CreateRoleSubmenuDto } from './create-role-submenu-dto';

export interface CreateRoleMenuDto {
    menuId: number;
    roleSubmenus: CreateRoleSubmenuDto;
    isChecked: boolean;
    createz: boolean;
    readz: boolean;
    updatez: boolean;
    deletez: boolean;
}
