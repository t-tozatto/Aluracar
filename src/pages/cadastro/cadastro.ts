import { HomePage } from "./../home/home";
import { AgendamentosServiceProvider } from "./../../providers/agendamentos-service/agendamentos-service";
import { Carro } from "./../../modelos/carro";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Alert,
} from "ionic-angular";
import { Agendamento } from "../../modelos/agendamento";

@IonicPage()
@Component({
  selector: "page-cadastro",
  templateUrl: "cadastro.html",
})
export class CadastroPage {
  public carro: Carro;
  public precoTotal: number;

  public nome: string = "";
  public endereco: string = "";
  public email: string = "";
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertController: AlertController
  ) {
    this.carro = this.navParams.get("carroSelecionado");
    this.precoTotal = this.navParams.get("precoTotal");
  }

  agenda() {
    if (!this.nome || !this.endereco || !this.email) {
      this._alertController
        .create({
          title: "Preenchimento obrigatório",
          subTitle: "Preencha todos os campos!",
          buttons: [{ text: "Ok" }],
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
    };

    this._alerta = this._alertController.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          },
        },
      ],
    });

    let mensagem = "";
    this._agendamentoService
      .agenda(agendamento)
      .finally(() => {
        this._alerta.setSubTitle(mensagem);
        this._alerta.present();
      })
      .subscribe(
        () => {
          mensagem = "Agendamento realizado!";
        },
        () => {
          mensagem = "Falha no agendamento! Tente novamente mais tarde.";
        }
      );
  }
}
