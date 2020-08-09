import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _usuarioService: UsuariosServiceProvider,
              private _alertController: AlertController) {
  }

  efetuaLogin() {
    this._usuarioService.efetuaLogin(this.email, this.senha)
      .subscribe((usuario: Usuario) => {
        this.navCtrl.setRoot(HomePage);
      },
      () => {
        this._alertController.create({
          title: 'Falha no login',
          subTitle: 'E-mail ou senha incorretos!',
          buttons: [
            { text: 'Ok' }
          ]
        }).present();
      });
  }
}
