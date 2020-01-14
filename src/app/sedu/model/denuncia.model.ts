export interface Denuncia {
  id?: number;

  // dados do autor
  autor: string;
  papelDoAutor: number;
  outroPapel?: string;
  email: string;
  acesso_cidadao: string;

  // dados de um aluno
  aluno: string;
  registroAcademico: string;
  codigoEDP: string;
  escolaId: number;

  // dados do veículo
  placaVeiculo: string;

  // dados da rota
  rotaId: number;

  // detalhes da reclamação
  tipoReclamacao: number;
  dataReclamacao: Date;
  outroTipo?: string;
  descricao: string;
}