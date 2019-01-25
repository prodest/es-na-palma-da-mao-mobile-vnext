import { Anexo } from './anexo.model';
import { Datas } from './datas.model';
import { Areas } from './areas.model';

export class Concurso {
  id: number;
  liberarClassificacao: boolean;
  status: string;
  orgao: string;
  descricao: string;
  datas: Datas[];
  anexos: Anexo[];
  nome: string;
  areas: Areas[];
}
