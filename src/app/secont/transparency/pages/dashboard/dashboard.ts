import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'TransparenciaDashboardPage',
  segment: 'secont/transparencia'
})
@Component({
  selector: 'page-transparencia-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  pages = [
    {
      type: 'revenues',
      name: 'Receitas',
      icon: 'fa-line-chart',
      url: 'TransparenciaRevenuesPage'
    },
    {
      type: '',
      name: 'Orçamentos',
      icon: 'fa-bar-chart',
      url: 'TransparenciaOrcamentosPage'
    },
    {
      type: '',
      name: 'Orçado x Executado',
      icon: 'fa-bar-chart',
      url: 'TransparenciaOrcadoxExecutadoPage'
    },
    {
      type: 'expenses',
      name: 'Despesas por Área',
      icon: 'fa-line-chart',
      url: 'TransparenciaExpensesByAreaPage'
    },
    {
      type: 'expenses',
      name: 'Despesas por Órgão',
      icon: 'fa-line-chart',
      url: 'TransparenciaExpensesByOriginPage'
    },
    {
      type: '',
      name: 'Obras Públicas',
      icon: 'fa-building-o',
      url: 'TransparenciaPublicWorksPage'
    }
  ];
}
