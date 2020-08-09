import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
    
  }

  private _geraChave(agendamento: Agendamento): string{
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento) {
    return Observable.fromPromise(this._storage.set(this._geraChave(agendamento), agendamento));
  }

  chaveDuplicada(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    let promise = this._storage
                      .get(chave)
                      .then(dado => dado ? true : false);

    return Observable.fromPromise(promise);
  }

  listaTodos(): Observable<Agendamento[]> {
    let agendamentos: Agendamento[] = [];
    return Observable.fromPromise(this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    }).then(() => agendamentos));
  }
}
