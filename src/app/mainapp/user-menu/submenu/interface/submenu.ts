import { RoleAccess } from '../../role/interface/role-access';

export class Submenu {
    backend_url: string = '';
    frontend_url: string = '';
    id: string = "";
    menu_id: string = "";
    submenu_icon: string = '';
    submenu_is_active: boolean = false;
    submenu_name: string = '';
    access: RoleAccess = {} as RoleAccess;
}
