import { Anexo } from './anexo.model';
import { Datas } from './datas.model';
import { Areas } from './areas.model';
import { ID } from '@datorama/akita';

export class Concurso {
  id: ID;
  liberarClassificacao?: boolean;
  status: string;
  orgao: string;
  descricao?: string;
  datas?: Datas[];
  anexos?: Anexo[];
  nome?: string;
  areas?: Areas[];
  favorito?: boolean;
}
