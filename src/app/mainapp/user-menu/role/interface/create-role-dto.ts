import { CreateRoleMenuDto } from '../../menu/interface/create-role-menu-dto';

export interface CreateRoleDto {
    roleName: string;
    roleMenus: CreateRoleMenuDto[];
}
