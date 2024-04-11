import { CreateRoleMenuDto } from '../../menu/interface/create-role-menu-dto';

export interface CreateRoleDto {
    role_name: string;
    role_menus: CreateRoleMenuDto[];
}
