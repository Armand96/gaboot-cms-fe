import { RoleAccess } from './role-access';
import { RoleMenu } from './role-menu';

export class Role {
    id: number = 0;
    roleName: string = '';
    menus: RoleMenu[] = [];
    access: RoleAccess[] = [];
}
