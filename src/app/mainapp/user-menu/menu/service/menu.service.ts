import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { AuthService } from 'src/app/mainapp/services/auth-service/auth.service';
import { ResponseSuccess } from 'src/app/mainapp/services/interfaces/response.dto';
import { Menu } from '../interface/menu';
import { CreateMenuDto } from '../interface/create-menu-dto';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private api: ApiService, private auth: AuthService) { }
  private baseUrl: string = "menu/";
  private baseUrl2: string = "menu";

  getMenus(params = "") {
    return this.api.getAPI<ResponseSuccess<Menu>>(this.baseUrl2 + params);
  }

  getMenu(id: number) {
    return this.api.getAPI<ResponseSuccess<Menu>>(this.baseUrl+id);
  }

  createMenu(data: CreateMenuDto) {
    return this.api.postAPI<ResponseSuccess<Menu>>(this.baseUrl, data);
  }

  updateMenu(id: number, data: CreateMenuDto) {
    return this.api.patchAPI<ResponseSuccess<Menu>>(this.baseUrl+id, data);
  }

  deleteMenu(id: number) {
    return this.api.deleteAPI<ResponseSuccess<Menu>>(this.baseUrl+id);
  }
}
