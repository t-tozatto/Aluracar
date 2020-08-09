import { ApiServiceProvider } from './../api-service/api-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentosServiceProvider {

  private _url: string;

  constructor(public _http: HttpClient,
              _apiService: ApiServiceProvider) {
    this._url = _apiService.apiUrl;
  }

  agenda(agendamento: Agendamento) {
    return this._http
    .post(this._url + 'agendamento/agenda', agendamento)
    .do(() => agendamento.enviado = true)
    .catch((err) => Observable.of(new Error('Falha no agendamento! Tente novamente mais tarde.')));
  }

}
