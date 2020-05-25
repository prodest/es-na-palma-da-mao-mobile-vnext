export interface Denuncia {
  id?: number;
  protocolo?: string;
  statusId?: number;
  status?: string;
  dataRegistro?: Date;
  parecer?: string;

  // dados do autor
  autor: string;
  papelDoAutor: number | string;
  outroPapel?: string;
  email: string;
  acesso_cidadao: string;
  cpf: string;

  // dados de um aluno
  alunoId: number;
  aluno: string;
  registroAcademico: string;
  codigoEDP: string;
  escolaId: number;
  escola?: string;

  // dados do veículo
  placaVeiculo: string;

  // dados da rota
  rotaId: number;
  rota?: string;

  // detalhes da reclamação
  tipoReclamacao: number | string;
  dataReclamacao: Date;
  outroTipo?: string;
  descricao: string;
}