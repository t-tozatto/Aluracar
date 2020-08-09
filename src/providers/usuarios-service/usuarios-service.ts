import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Usuario } from "../../modelos/usuario";
import { ApiServiceProvider } from "../api-service/api-service";

@Injectable()
export class UsuariosServiceProvider {
  url: string;
  private _usuarioLogado: Usuario;

  constructor(
    private _httpCliente: HttpClient,
    _apiService: ApiServiceProvider
  ) {
    this.url = _apiService.apiUrl;
  }

  efetuaLogin(email: string, senha: string): Observable<Usuario> {
    return this._httpCliente
      .post<Usuario>(this.url + "login", { email, senha })
      .do((usuario: Usuario) => (this._usuarioLogado = usuario));
  }

  obtemUsuarioLogado(): Usuario {
    return this._usuarioLogado;
  }
}
