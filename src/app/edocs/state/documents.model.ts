import { ID } from '@datorama/akita';

export interface Document {
  id: ID;
  nome: string;
  dataEnvio: string;
  dataEnvioLabel: string;
  paginas: number;
  bytes: number;
  tamanho: string;
  isBloqueadoParaAssinaturas: boolean;
  isCapturadoPorMim: boolean;
  papelAssinatura: string;
  qtdeAssinados: number;
  qtdeRecusas: number;
  qtdeFaltaAssinar: number;
  soFaltaOUsuarioSeManifestar: boolean;
  capturador: Capturador;
}

export interface Capturador {
  id: number;
  nome: string;
}
