export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number,
  passou: boolean,
  atualizado: boolean,
  ignicao: boolean
}

export function createVehicle(
  {
    bandeira = '',
    linha = '',
    rotulo = null,
    distancia = 0,
    passou = false,
    atualizado = true,
    ignicao = false
  }: Partial<Vehicle>): Vehicle {
    return {
      bandeira, linha, rotulo, distancia, passou, atualizado, ignicao
    } as Vehicle;
}
