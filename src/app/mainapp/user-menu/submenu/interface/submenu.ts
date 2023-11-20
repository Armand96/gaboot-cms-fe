import { RoleAccess } from '../../role/interface/role-access';

export class Submenu {
    backendUrl: string = '';
    frontendUrl: string = '';
    id: number = 0;
    menuId: number = 0;
    submenuIcon: string = '';
    submenuIsActive: boolean = false;
    submenuName: string = '';
    access: RoleAccess = {} as RoleAccess;
}
