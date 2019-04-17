import { Datas, Anexo } from '../../concurso/model';
import { ID } from '@datorama/akita';

export class Concurso {
  id: ID;
  status: string;
  nome: string;
  anoBase?: Date;
  categoria?: string;
  tipo?: string;
  datas?: Datas[];
  anexos?: Anexo[];
  favorito?: boolean;
}
