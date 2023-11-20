import { Menu } from '../../menu/interface/menu';
import { RoleSubmenu } from './role-submenu';

export class RoleMenu {
    id: number = 0;
    menuId: number = 0;
    roleId: number = 0;
    menu: Menu = {} as Menu;
    submenus: RoleSubmenu[] = [];
}
