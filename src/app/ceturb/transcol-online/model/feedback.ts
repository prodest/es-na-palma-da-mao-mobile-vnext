import { AcessoCidadaoClaims as User } from '@espm/core';

export const feedbackList = [
  {
    description: 'A linha não aparece no ponto escolhido',
    showStop: true,
    showLine: true,
    showTime: true,
    getLocation: false,
    showText: false
  },
  {
    description: 'Erro na localização ou endereço do ponto de parada',
    showStop: true,
    showLine: false,
    showTime: false,
    getLocation: false,
    showText: false
  },
  {
    description: 'Erro no horário previsto (erro maior que três minutos, antes ou após o horário)',
    showStop: true,
    showLine: true,
    showTime: true,
    getLocation: true,
    showText: false
  },
  {
    description: 'Erro na previsão da viagem (veículo não passou)',
    showStop: true,
    showLine: true,
    showTime: true,
    getLocation: true,
    showText: false
  },
  {
    description: 'Outro problema',
    showStop: false,
    showLine: false,
    showTime: false,
    getLocation: false,
    showText: true
  }
];

export enum FeedBackType {
  LinhaNaoAparece = 0,
  LocalizacaoErrada = 1,
  ErroNoHorario = 2,
  ErroNaPrevisao = 3,
  OutroProblema = 4
}

export type FeedBack = {
  line?: number;
  stop?: number;
  time?: Date;
  text?: string;
  type?: FeedBackType;
  user?: Partial<User>;
};
