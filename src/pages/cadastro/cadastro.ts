import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Alert,
} from 'ionic-angular';
import { Agendamento } from '../../modelos/agendamento';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertController: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  agenda() {
    if (!this.nome || !this.endereco || !this.email) {
      Vibration.vibrate(500)
      this._alertController
        .create({
          title: 'Preenchimento obrigatório',
          subTitle: 'Preencha todos os campos!',
          buttons: [{ text: 'Ok' }],
        })
        .present();
      return;
    }
    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    this._alerta = this._alertController.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          },
        },
      ],
    });

    let mensagem = '';

    this._agendamentoDao.chaveDuplicada(agendamento)
        .mergeMap(duplicado => {
          if (duplicado) {
            throw new Error('Agendamento existente!');
          }

          return this._agendamentoService.agenda(agendamento);
        })
        .mergeMap((valor) => {

          let observable = this._agendamentoDao.salva(agendamento);
          if (valor instanceof Error) {
            throw valor;
          }
          
          return observable;
        })
        .finally(
          () => {
            this._alerta.setSubTitle(mensagem);
            this._alerta.present();
          }
        )
        .subscribe(
          () => mensagem = 'Agendamento realizado!',
          (err: Error) => mensagem = err.message
        );
  }
}
