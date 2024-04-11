import { Role } from '../../role/interface/role';

export class User {
    id: string = "";
    username: string = '';
    email: string = '';
    firstname: string = '';
    lastname: string = '';
    password: string = '';
    token: string = '';
    is_active: boolean = false;
    image_path: string = '';
    thumbnail_path: string = '';
    role_id: string = "";
    role: Role = {} as Role;
}
