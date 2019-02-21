export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number,
  passou: boolean,
  atualizado: boolean,
  ignicao: boolean,
  datahora: number
}

export function createVehicle(
  {
    bandeira = '',
    linha = '',
    rotulo = null,
    distancia = 0,
    passou = false,
    atualizado = true,
    ignicao = false,
    datahora = 0
  }: Partial<Vehicle>): Vehicle {
    return {
      bandeira, linha, rotulo, distancia, passou, atualizado, ignicao, datahora
    } as Vehicle;
}
