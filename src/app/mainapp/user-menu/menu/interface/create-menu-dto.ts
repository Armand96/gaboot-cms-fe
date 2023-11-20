export class CreateMenuDto {
    menuName: string = '';
    menuIcon: string = '';
    frontendUrl: string = '';
    backendUrl: string = '';
    menuHaveChild: boolean = false;
    menuIsActive: boolean = false;
}
