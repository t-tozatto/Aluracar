import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Carro } from "../../modelos/carro";
import { Observable } from "rxjs/Observable";
import { ApiServiceProvider } from "../api-service/api-service";

@Injectable()
export class CarrosServiceProvider {
  private url: string;

  constructor(
    private _http: HttpClient,
    _apiService: ApiServiceProvider
  ) {
    this.url = _apiService.apiUrl;
  }

  lista(): Observable<Carro[]> {
    console.log(this.url + "carro/listaTodos");
    return this._http.get<Carro[]>(this.url + "carro/listaTodos");
  }
}
