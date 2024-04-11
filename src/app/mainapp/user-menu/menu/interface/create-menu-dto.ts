export class CreateMenuDto {
    menu_name: string = '';
    menu_icon: string = '';
    frontend_url: string = '';
    backend_url: string = '';
    menu_have_child: boolean = false;
    menu_is_active: boolean = false;
}
