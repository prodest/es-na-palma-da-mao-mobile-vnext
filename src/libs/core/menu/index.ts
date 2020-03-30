import { InjectionToken } from "@angular/core";
import { ItemMenu } from "../../../app/navegacao/models";

export const MENUS: ItemMenu[] = [
  {
    id: 1,
    title: 'Servidor',
    icon: 'custom-modulo-servidor',
    component: 'PresentationCivilServantPage',
    isChecked: false,
    isCivilServant: true
  },
  {
    id: 2,
    title: 'E-Docs',
    icon: 'custom-modulo-processos',
    component: 'PresentationEdocsPage',
    secure: true,
    isChecked: false
  },
  {
    id: 3,
    title: 'Detran',
    icon: 'custom-modulo-taxi',
    component: 'DetranServicePage',
    secure: true,
    isChecked: false
  },
  {
    id: 4,
    title: 'Oportunidades',
    icon: 'custom-modulo-oportunidades',
    component: 'ApresentacaoPage',
    isChecked: false
  },
  {
    id: 5,
    title: 'Ônibus',
    icon: 'custom-modulo-onibus',
    component: 'BusLinesPage',
    isChecked: false
  },
  {
    id: 6,
    title: 'Qualidade do Ar',
    icon: 'custom-modulo-qualidade',
    component: 'AirPage',
    isChecked: false
  },
  {
    id: 7,
    title: ' Transparência ES',
    icon: 'custom-modulo-consultas',
    component: 'TransparencyDashboardPage',
    isChecked: false
  },
  {
    id: 8,
    title: 'Diário Oficial ES',
    icon: 'custom-modulo-consultas',
    component: 'DioSearchPage',
    isChecked: false
  },
  {
    id: 9,
    title: 'Notícias ',
    icon: 'custom-modulo-noticias',
    component: 'NewsHighlightsPage',
    isChecked: false
  },
  {
    id: 10,
    title: 'Agenda ES',
    icon: 'custom-modulo-agendamento',
    component: 'CalendarPage',
    isChecked: false
  }, 
  {
    id: 11,
    title: 'Agendamento',
    icon: 'custom-modulo-agendamento',
    component: 'PresentationPage',
    isChecked: false
  },
     {
       id: 23,
       title: "Sedu",
       icon: 'custom-modulo-educacao',
       component: 'SeduIndexPage',
       isChecked: false
     }
  ];
  
  export function menusFactory() {
    return MENUS;
  }
  
  export const MenuToken = new InjectionToken('menu-data');
  
  // menu provider
  export const MenusStaticProvider = {
    provide: MenuToken,
    useFactory: menusFactory
  };
  