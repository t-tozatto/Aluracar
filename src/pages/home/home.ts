import { EscolhaPage } from './../escolha/escolha';
import { NavLifeCycles } from "./../../utils/ionic/nav/nav-lifecycles";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  AlertController,
} from "ionic-angular";

import { Carro } from "../../modelos/carro";
import { CarrosServiceProvider } from "../../providers/carros-service/carros-service";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements NavLifeCycles {
  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private _loadingController: LoadingController,
    private _alertController: AlertController,
    private _carrosService: CarrosServiceProvider
  ) {}

  ionViewDidLoad(): void {
    let loading = this._loadingController.create({
      content: "Carregando carros...",
    });

    loading.present();

    this._carrosService.lista().subscribe(
      (carros) => {
        this.carros = carros;
        loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        loading.dismiss();
        this._alertController
          .create({
            title: "Falha na conexão",
            subTitle:
              "Não foi possível carregar a lista de carros. Tente novamente mais tarde.",
            buttons: [{ text: "Ok" }],
          })
          .present();
      }
    );
  }

  selecionaCarro(carro: Carro) {
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });
  }
}
