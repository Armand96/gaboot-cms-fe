import { RoleAccess } from './role-access';
import { RoleMenu } from './role-menu';

export class Role {
    id: string = "";
    role_name: string = '';
    menus: RoleMenu[] = [];
    access: RoleAccess[] = [];
}
