import { Submenu } from "../../submenu/interface/submenu";

export class Menu {
  // access: IMenuAccess;
  id:number = 0;
  menuId:number = 0;
  menuName: string = "";
  menuIcon: string = "";
  frontendUrl: string = "";
  backendUrl: string = "";
  menuHaveChild: boolean = false;
  menuIsActive: boolean = false;
  submenus: Submenu[] = [];
}
