import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'TransparencyDashboardPage',
  segment: 'secont/transparencia'
})
@Component({
  selector: 'page-transparency-dashboard',
  templateUrl: 'transparency-dashboard.html'
})
export class TransparencyDashboardPage {
  menus = [
    {
      type: 'revenues',
      buttonTitle: 'Receitas',
      icon: 'fa-line-chart',
      targetPage: 'TransparenciaRevenuesPage'
    },
    {
      type: '',
      buttonTitle: 'Orçamentos',
      icon: 'fa-bar-chart',
      targetPage: 'TransparenciaOrcamentosPage'
    },
    {
      type: '',
      buttonTitle: 'Orçado x Executado',
      icon: 'fa-bar-chart',
      targetPage: 'TransparenciaOrcadoxExecutadoPage'
    },
    {
      type: 'expenses',
      buttonTitle: 'Despesas por Área',
      icon: 'fa-line-chart',
      targetPage: 'TransparenciaExpensesByAreaPage'
    },
    {
      type: 'expenses',
      buttonTitle: 'Despesas por Órgão',
      icon: 'fa-line-chart',
      targetPage: 'TransparenciaExpensesByOriginPage'
    },
    {
      type: '',
      buttonTitle: 'Obras Públicas',
      icon: 'fa-building-o',
      targetPage: 'TransparenciaPublicWorksPage'
    }
  ];
}
