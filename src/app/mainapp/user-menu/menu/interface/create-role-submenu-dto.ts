export interface CreateRoleSubmenuDto {
  submenuId: number,
  menuId: number,
  isChecked: boolean,
  create: boolean,
  read: boolean,
  updates: boolean,
  delete: boolean
}
