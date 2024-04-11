import { Submenu } from '../../submenu/interface/submenu';
import { MenuAccess } from './menu-access';

export class Menu {
    access: MenuAccess = {} as MenuAccess;
    id: string = "";
    menu_id: string = "";
    menu_name: string = '';
    menu_icon: string = '';
    frontend_url: string = '';
    backend_url: string = '';
    menu_have_child: boolean = false;
    menu_is_active: boolean = false;
    submenus: Submenu[] = [];
}
