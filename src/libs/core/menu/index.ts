import { InjectionToken } from "@angular/core";
import { ItemMenu } from "../../../app/navegacao/models";

export const MENUS: ItemMenu[] = [
    
    {
      id: 2,
      title: 'Notícias ',
      icon: 'custom-modulo-noticias',
      component: 'NewsHighlightsPage',
      isChecked: false
    },
    {
      id: 3,
      title: 'Agenda ES',
      icon: 'custom-modulo-agendamento',
      component: 'CalendarPage',
      isChecked: false
    },
    {
      id: 4,
      title: 'Consulta Processo',
      icon: 'custom-modulo-processos',
      component: 'SepSearchPage',
      isChecked: false
    },
    {
      id: 5,
      title: 'Detran',
      icon: 'custom-modulo-taxi',
      component: 'DetranServicePage',
      secure: true,
      isChecked: false
    },
  
    {
      id: 7,
      title: 'Documentos para assinar',
      icon: 'custom-modulo-documentos',
      component: 'DocumentsToSignPage',
      secure: true,
      isChecked: false
    },
  
    {
      id: 8,
      title: 'Consulta Ônibus',
      icon: 'custom-modulo-onibus',
      component: 'BusLinesPage',
      isChecked: false
    },
    {
      id: 9,
      title: 'Transcol Online',
      icon: 'custom-modulo-onibus',
      component: 'TranscolOnlinePage',
      isChecked: false
    },
  
    {
      id: 10,
      title: 'Portal da Transparência',
      icon: 'custom-modulo-consultas',
      component: 'TransparencyDashboardPage',
      isChecked: false
    },
  
    {
      id: 11,
      title: 'Consultas',
      icon: 'custom-modulo-consultas',
      component: 'DioSearchPage',
      isChecked: false
    },
    {
      id: 12,
      title: 'Edições Recentes',
      icon: 'custom-modulo-noticias',
      component: 'LatestEditionsPage',
      isChecked: false
    },
  
    {
      id: 13,
      title: 'Táxi Gov',
      icon: 'custom-modulo-taxi',
      component: '',
      url: 'mb://action=login',
      name: 'app.mb',
      deepLink: true,
      package: 'mb.taxi.meiabandeirada',
      uriScheme: 'mb://',
      isChecked: false
    },
  
    {
      id: 14,
      title: 'Buscar concursos',
      icon: 'custom-modulo-oportunidades',
      component: 'ApresentacaoPage',
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
  