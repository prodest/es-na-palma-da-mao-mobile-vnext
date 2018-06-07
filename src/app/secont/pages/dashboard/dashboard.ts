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
      url: ''
    },
    {
      type: '',
      name: 'Orçamentos',
      icon: 'fa-bar-chart',
      url: ''
    },
    {
      type: '',
      name: 'Orçado x Executado',
      icon: 'fa-bar-chart',
      url: ''
    },
    {
      type: 'expenses',
      name: 'Despesas por Área',
      icon: 'fa-line-chart',
      url: ''
    },
    {
      type: 'expenses',
      name: 'Despesas por Órgão',
      icon: 'fa-line-chart',
      url: ''
    },
    {
      type: '',
      name: 'Obras Públicas',
      icon: 'fa-building-o',
      url: ''
    }
  ];
}
