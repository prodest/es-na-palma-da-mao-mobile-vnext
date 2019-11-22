export interface Denuncia {
  autor: string;
  email: string;
  aluno: string;
  codigoEDP: string;
  tipoReclamacao: number;
  dataReclamacao: Date;
  dataReclamacaoString: string;
  outroTipo?: string;
  descricao: string;
  inepEscola: string;
}