export interface Environment {
  production: boolean;
  envName: string;
  api: {
    invalidTokenHttpCode: number;
    news: string;
    calendars: string;
    sep: string;
    detran: string;
    detranInternetBanking: string;
    dio: string;
    ceturb: string;
    cbmes: string;
    push: string;
    espm: string;
    acessocidadao: string;
    acessocidadaoApi: string;
    transparency: string;
    feedback: string;
    empregabilidade: string;
  };
  push: {
    senderId: string;
    forceShow: boolean;
    alert: string;
    badge: string;
    sound: string;
    defaultIcon: string;
    defaultColor: string;
  };
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  locale: string;
  identityServer: {
    url: string;
    publicKey: string;
    defaultScopes: string;
    clients: {
      espm: {
        id: string;
        secret: string;
      };
      espmExternalLoginAndroid: {
        id: string;
        secret: string;
      };
    };
  };
  googleWebClientId: string;
  mobile: {
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
    digitosCodigoVerificacao: number;
  };
}
