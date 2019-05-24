import { Datas } from "./datas.model";

export class Curso {
  id: number;
  nome: string;
  cargaHoraria: number;
  vagas: number;
  turno: string;
  datas: Datas[];
  ofertante: string;
  status: string;
  municipio: string;

}
