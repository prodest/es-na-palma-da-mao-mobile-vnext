export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number
}

export function createVehicle(
  {
    bandeira = '',
    linha = '',
    rotulo = null,
    distancia = 0
  }: Partial<Vehicle>): Vehicle {
    return {
      bandeira, linha, rotulo, distancia
    } as Vehicle;
}
