export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number,
  passou: boolean,
  atualizado: boolean
}

export function createVehicle(
  {
    bandeira = '',
    linha = '',
    rotulo = null,
    distancia = 0,
    passou = false,
    atualizado = true
  }: Partial<Vehicle>): Vehicle {
    return {
      bandeira, linha, rotulo, distancia, passou, atualizado
    } as Vehicle;
}
