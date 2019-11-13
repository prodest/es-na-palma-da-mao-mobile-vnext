export interface Denuncia {
  autor: string;
  email: string;
  aluno: string;
  codigoEdp: string;
  tipo: number;
  outroTipo?: string;
  descricao: string;
  inepEscola: string;
}