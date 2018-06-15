export interface PublicWorksByCityItem {
  id: number;
  value: number;
  label: string;
  percentage: number;
  decimalPercentage: number;
  status?: PublicWorkStatus;
  color: string;
  list: boolean;
  plot: boolean;
}

export enum PublicWorkStatus {
  Concluida = 'Concluída',
  Iniciada = 'Iniciada',
  Paralisada = 'Paralisada',
  Reiniciada = 'Reiniciada'
}
