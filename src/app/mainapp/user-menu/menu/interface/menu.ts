import { Submenu } from '../../submenu/interface/submenu';
import { MenuAccess } from './menu-access';

export class Menu {
    access: MenuAccess = {} as MenuAccess;
    id: number = 0;
    menuId: number = 0;
    menuName: string = '';
    menuIcon: string = '';
    frontendUrl: string = '';
    backendUrl: string = '';
    menuHaveChild: boolean = false;
    menuIsActive: boolean = false;
    submenus: Submenu[] = [];
}
