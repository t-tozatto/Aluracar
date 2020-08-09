import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  private readonly _apiUrl = 'http://192.168.0.228:8080/api/';
  constructor() {
  }

  get apiUrl(){
    return this._apiUrl;
  }

}
