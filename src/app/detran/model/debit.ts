import { Flag } from './flag';

export interface Debit {
  descricaoServico: string;
  valorAtualizadoFranquia: number;
  dataVencimento: string;
  dpvatCotas: string;
  idDebito: number;
  placa: string;
  flag: Flag;
  codigoServico: number;
  classe: number;
  exercicio: number;
  parcela: number;
  ipvaCotas: string;
  isChecked: boolean;
}
