import { Environment } from './environment';

/* eslint-disable */
export const dev: Environment = {
  production: false,
  envName: 'dev',
  mocks: {
    edocs: false
  },

  api: {
    invalidTokenHttpCode: 498,
    news: process.env.API_NEWS_URL || 'https://api.es.gov.br/developers/news',
    calendars: process.env.API_CALENDARS_URL || 'https://api.es.gov.br/developers/calendars',
    sep: process.env.API_SEP_URL || 'https://api.es.gov.br/developers/sep',
    detran: process.env.API_DETRAN_URL || 'https://api.es.gov.br/developers/detran',
    detranInternetBanking: process.env.API_DETRAN_INTERNET_BANKING_URL || 'https://api.es.gov.br/api-detran-debitos',
    dio: process.env.API_DIO_URL || 'https://api.es.gov.br/developers/dio',
    ceturb: process.env.API_CETURB_URL || 'https://api.es.gov.br/developers/ceturb',
    ceturbv2: process.env.API_CETURBV2_URL || 'https://api.es.gov.br/transcol',
    realtime: process.env.API_REALTIME_URL || 'https://api.es.gov.br/realtime',
    cbmes: process.env.API_CBMES_URL || 'https://api.es.gov.br/developers/cbmes',
    push: process.env.API_PUSH_URL || 'https://api.es.gov.br/developers/push/api/v1/',
    espm: process.env.API_ESPM_URL || 'https://api.es.gov.br/developers/espm',
    transparency: process.env.API_TRANSPARENCY_URL || 'https://api.es.gov.br/developers/transparency',
    acessocidadaoApi: process.env.API_ACESSO_CIDADAO_URL || 'https://developers.es.gov.br/acessocidadao.webapi/api',
    acessocidadao: process.env.ACESSO_CIDADAO_URL || 'https://developers.es.gov.br/acessocidadao',
    feedback: process.env.API_FEEDBACK_URL || 'https://developers.es.gov.br/demandas',
    edocs: process.env.API_EDOCS_URL || 'http://api.e-docs.des.es.gov.br',
    empregabilidade: process.env.API_EMPREGABILIDADE || 'https://api.es.gov.br/dev/selecaodt/concursos',
    selecaoalunos: process.env.API_SELECAOALUNOS || 'https://api.es.gov.br/selecao-aluno/processos-seletivos',
    scheduling: process.env.API_SCHEDULING_URL || 'https://agendamento.dchm.es.gov.br/api',
    guide: process.env.API_GUIDE_URL || 'https://guiadeservicos.dchm.es.gov.br/Servicos',
    mailer: process.env.API_MAILER_URL || 'https://agendamento.dchm.es.gov.br/email',
    convertToPdf: process.env.API_CONVERT_TO_PDF || 'https://api.es.gov.br/pdf/',
    airQuality: process.env.API_QUALITY_AR || 'https://qualidadedoarapi.es.gov.br/api/mapa',
    sugestaodt: process.env.API_SUGESTAO_URL || 'https://api.es.gov.br/sugestaodt',
    sugestaoaluno: process.env.API_SUGESTAO_ALUNO_URL || 'https://api.es.gov.br/sugestaoaluno',
    siarhes: process.env.API_SIARHES || 'https://apisiarhes.dchm.es.gov.br/api/espm',
    clima: process.env.API_CLIMA || 'http://api.openweathermap.org/data/2.5/weather',
    climaKey: process.env.KEY_ACESS_WEATHER
    seduDenuncias: process.env.API_SEDU_DENUNCIAS_URL || 'https://api.es.gov.br/sedu/api/denuncias',
    seduDenunciasToken: process.env.API_SEDU_DENUNCIAS_TOKEN
  },
  push: {
    senderId: process.env.PUSH_SENDER_ID,
    forceShow: true,
    alert: 'true',
    badge: 'true',
    sound: 'true',
    defaultIcon: 'notification',
    defaultColor: '#549db2'
  },
  pagination: {
    pageNumber: 0,
    pageSize: 10
  },
  locale: 'pt-br',
  identityServer: {
    url: process.env.IDENTITY_SERVER_URL || 'https://developers.es.gov.br/acessocidadao/is',
    defaultScopes:
      'openid offline_access ApiAcessoCidadao cpf nome email documentos api-acessocidadao-base api-acessocidadao-servidores api-sigades-documento api-siahres-int-espm',
    publicKey:
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArYaYlPnnrxBVwC4o0ykG\nVg8gjH/TerrrXS3GmsZeON6SCNuOBzUj+7RiEF64lE//gLY01nTJZtnUIPvmKJW/\n1+eWxGNW1Mh1JpT/f3A6Q5rp2WNKSBwvEFPE58lkD63Tewsn3+0dw+aFKaSW+l3A\nZ7WS4AxXxBLIRr2zpTL3DOCbeT/m2yEQ8Do662/d+ty7F08FJVaaz2PxmnLEeSQX\n6RTRPeFRPlGVj91H4h85Ln+0Oc0U/oiqa+AKwobWXLOqDKhn8HYZuoya368TqZ9X\n26QEp1g7psaT8kiNRFAt0Yb4WbgFSWf2r92HDS8dj25TNTeeLkvZ48KylTKU23DT\nqQIDAQAB\n-----END PUBLIC KEY-----',
    clients: {
      espm: {
        id: process.env.IDENTITY_SERVER_ESPM_ID || '0f06212c-aac4-482e-9489-c50789ceaa5c',
        secret: process.env.IDENTITY_SERVER_ESPM_SECRET || '123123123'
      },

      espmExternalLoginAndroid: {
        id: process.env.IDENTITY_SERVER_EXTERNAL_LOGIN_ID || '0184531e-ca21-463b-ba67-2642997af511',
        secret: process.env.IDENTITY_SERVER_EXTERNAL_LOGIN_SECRET || '123123123'
      }
    }
  },
  googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID || '',
  mobile: {
    client_id: 'espm',
    client_secret: 'secret',
    grant_type: 'password',
    scope: 'openid',
    digitosCodigoVerificacao: 6
  }
};
