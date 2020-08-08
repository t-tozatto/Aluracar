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

  salva(agendamento: Agendamento): Observable<any> {
    let chave = this._geraChave(agendamento);

    this.agendamentoDuplicado(chave).mergeMap(duplicado => {throw new Error('Agendamento existente!')})
    return Observable.fromPromise(this._storage.set(chave, agendamento));
  }

  agendamentoDuplicado(chave: string): Observable<boolean> {
    return Observable.fromPromise(this._storage
      .get(chave)
      .then((dado) =>  {
        return dado ? true : false;
      }));
  }
}
