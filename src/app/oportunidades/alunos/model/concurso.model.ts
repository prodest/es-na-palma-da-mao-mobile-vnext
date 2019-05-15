import { Datas, Anexo } from '../../alunos/model';
import { ID } from '@datorama/akita';
import { Curso } from './curso.model';

export class Concurso {
  id: ID;
  status: string;
  nome: string;
  descricao: string;
  anoBase?: Date;
  categoria?: string;
  tipo?: string;
  cronograma?: Datas[];
  anexos?: Anexo[];
  favorito?: boolean;
  cursos?: Curso[];
}
