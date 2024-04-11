import { Menu } from '../../menu/interface/menu';
import { RoleSubmenu } from './role-submenu';

export class RoleMenu {
    id: string = "";
    menu_id: string = "";
    role_id: string = "";
    menu: Menu = {} as Menu;
    submenus: RoleSubmenu[] = [];
}
