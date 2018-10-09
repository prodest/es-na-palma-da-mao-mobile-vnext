import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-list-result",
  templateUrl: "list-result.html"
})
export class ListResultPage {
  tab: any = "open";
  abertos = [
    { id: 1, nome: "sedu", vaga: "pedreiro", jobs: ["predero", "vridero"] },
    {
      id: 2,
      nome: "ifes",
      vaga: "carpinteiro",
      jobs: ["arrumador", "fazedor"]
    },
    { id: 3, nome: "ifes", vaga: "estagiario", jobs: ["predero", "vridero"] }
  ];
  andamentos = [
    { id: 1, nome: "sedu", vaga: "pedreiro", jobs: ["predero", "vridero"] },
    { id: 2, nome: "ifes", vaga: "carpinteiro", jobs: ["predero", "vridero"] },
    { id: 3, nome: "ifes", vaga: "estagiario", jobs: ["predero", "vridero"] }
  ];
  fechados = [
    { id: 1, nome: "sedu", vaga: "pedreiro", jobs: ["predero", "vridero"] },
    { id: 2, nome: "ifes", vaga: "carpinteiro", jobs: ["predero", "vridero"] },
    { id: 3, nome: "ifes", vaga: "estagiario", jobs: ["predero", "vridero"] }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  detail(id) {
    this.navCtrl.push(ListResultPage);
  }
}
