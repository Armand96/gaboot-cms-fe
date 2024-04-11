export interface CreateRoleSubmenuDto {
    submenu_id: string;
    menu_id: string;
    is_checked: boolean;
    create_access: boolean;
    read_access: boolean;
    update_access: boolean;
    delete_access: boolean;
}
