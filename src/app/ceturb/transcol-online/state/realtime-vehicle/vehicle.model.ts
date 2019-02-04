export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number,
  passou: boolean
}

export function createVehicle(
  {
    bandeira = '',
    linha = '',
    rotulo = null,
    distancia = 0,
    passou = false
  }: Partial<Vehicle>): Vehicle {
    return {
      bandeira, linha, rotulo, distancia, passou
    } as Vehicle;
}
