import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../modelos/carro';
import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:8080/api/';

@Injectable()
export class CarrosServiceProvider {

  constructor(private _http: HttpClient) {
    
  }

  lista(): Observable<Carro[]> {
    return this._http.get<Carro[]>(url + 'carro/listaTodos')
  }

}
