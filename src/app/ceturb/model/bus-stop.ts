export interface BusStop {
  id: number;
  identificador: string;
  descricao: string;
  direcao: number;
  latitude: number;
  longitude: number;
  logradouro: string;
  municipio: string;
  bairro: string;
  isTerminal: boolean;
  isPonto: boolean;
  tipo: 'ponto' | 'terminal';
}
