import { ID } from '@datorama/akita';

export enum ManifestacaoUsuario {
  Assinado = 1,
  Recusado = 2,
  NaoSeManifestou = 3
}

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
  manifestacaoUsuario: ManifestacaoUsuario;
}

export interface Capturador {
  id: number;
  nome: string;
}

export interface Destination {
  id: string;
  descricao: string; 
  tipo?: string;
}
