import { CreateRoleSubmenuDto } from './create-role-submenu-dto';

export interface CreateRoleMenuDto {
    menu_id: string;
    role_submenus: CreateRoleSubmenuDto;
    is_checked: boolean;
    create_access: boolean;
    read_access: boolean;
    update_access: boolean;
    delete_access: boolean;
}
