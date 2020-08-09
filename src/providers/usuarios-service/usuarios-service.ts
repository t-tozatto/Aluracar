import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../../modelos/usuario';

const url = 'http://localhost:8080/api/';

@Injectable()
export class UsuariosServiceProvider {

private _usuarioLogado: Usuario;

  constructor(private _httpCliente: HttpClient) {
  }

  efetuaLogin(email: string, senha: string): Observable<Usuario> {
    return this._httpCliente.post<Usuario>(url + 'login', { email, senha})
      .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado():Usuario {
    return this._usuarioLogado;
  }
}
