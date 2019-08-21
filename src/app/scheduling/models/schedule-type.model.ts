
  export interface TiposDocumento {
      id: number;
      nome: string;
      descricao: string;
  }

  export interface Agenda {
      tempoMedio: number;
      tiposDocumentos: TiposDocumento[];
      informacaoImpressao: string;
      emailObrigatorio: boolean;
      telefoneObrigatorio: boolean;
      horarioAutomatico: boolean;
  }

  export interface TipoAgenda {
      agenda: Agenda;
      diasDisponiveis: string[];
  }


