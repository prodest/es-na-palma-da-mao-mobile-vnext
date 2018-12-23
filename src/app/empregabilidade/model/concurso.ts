import { Anexo } from './anexo';
import { Datas } from './datas';

export class Concurso {
  id: number;
  status: string;
  orgao: string;
  descricao: string;
  datas: Datas[];
  anexos: Anexo[];
  nome: string;
}
