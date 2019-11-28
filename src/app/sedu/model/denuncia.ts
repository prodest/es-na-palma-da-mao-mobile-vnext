export interface Denuncia {
  // dados do autor
  autor: string;
  papelDoAutor: string;
  email: string;

  // dados de um aluno
  aluno: string;
  registroAcademico: string;
  codigoEDP: string;
  inepEscola: string;

  // dados do veículo
  placaVeiculo: string;

  // dados da rota
  codigoRota: number;

  // detalhes da reclamação
  tipoReclamacao: number;
  dataReclamacao: Date;
  dataReclamacaoString: string;
  outroTipo?: string;
  descricao: string;
}