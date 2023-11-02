import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  getLoading(): boolean {
    return this.isLoading;
  }
}
