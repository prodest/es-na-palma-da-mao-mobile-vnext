export interface Ticket {
  id: number;
  classification: string;
  date: string;
  description: string;
  district: string;
  place: string;
  plate: string;
  points: number;
  warning: boolean;
  amount: number;
}
