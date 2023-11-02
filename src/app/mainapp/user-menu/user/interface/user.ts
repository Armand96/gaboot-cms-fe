import { Role } from "../../role/interface/role";

export class User {
  id: number = 0;
  userName: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  token: string = "";
  isActive: boolean = false;
  imgPath: string = "";
  imgThumbPath: string = "";
  roleId: number = 0;
  role: Role = {} as Role;
}
