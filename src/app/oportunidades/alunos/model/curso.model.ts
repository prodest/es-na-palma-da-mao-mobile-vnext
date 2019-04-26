import { DateTime } from 'ionic-angular';

export class Curso {
  id: number;
  nome: string;
  cargaHoraria: number;
  vagas: number;
  turno: string;
  dtInicio: DateTime;
  dtFim: DateTime;
  ofertante: string;
}
