/**
 * @description Informações do papel de um usuário
 * @author David Vilaça
 * @date 2019-07-10
 * @export
 * @interface CidadaoPapeis
 */
export interface CidadaoRole {
  Guid: string;
  Nome: string;
  Tipo: string;
  LotacaoGuid: string;
  AgentePublicoSub: string;
  AgentePublicoNome: string;
}
