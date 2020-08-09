import { Agendamento } from "./../../modelos/agendamento";
import { AgendamentoDaoProvider } from "./../../providers/agendamento-dao/agendamento-dao";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Alert,
} from "ionic-angular";
import { AgendamentosServiceProvider } from "../../providers/agendamentos-service/agendamentos-service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-lista-agendamentos",
  templateUrl: "lista-agendamentos.html",
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[] = [];
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertController: AlertController
  ) {}

  ionViewDidLoad() {
    this._agendamentoDao
      .listaTodos()
      .subscribe(
        (agendamentos: Agendamento[]) => (this.agendamentos = agendamentos)
      );
  }

  reenviar(agendamento: Agendamento) {
    this._alerta = this._alertController.create({
      title: "Aviso",
      buttons: [
        {
          text: "Ok",
        },
      ],
    });

    let mensagem = "";

    return this._agendamentoService
      .agenda(agendamento)
      .mergeMap((valor) => {
        let observable = this._agendamentoDao.salva(agendamento);
        if (valor instanceof Error) {
          throw valor;
        }

        return observable;
      })
      .finally(() => {
        this._alerta.setSubTitle(mensagem);
        this._alerta.present();
      })
      .subscribe(
        () => (mensagem = "Agendamento reenviado!"),
        (err: Error) => (mensagem = err.message)
      );
  }
}
