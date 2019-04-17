import { Cargo } from './cargo.model';

export class Areas {
  id: number;
  nome: string;
  descricao: string;
  areas: Areas[];
  cargos: Cargo[];
}
