export type Vehicle = {
  bandeira: string,
  linha: string,
  rotulo: number,
  distancia: number
}

export function createVehicle({
  bandeira = '',
  linha = '',
  rotulo = null,
  distancia = null
}: Vehicle): Partial<Vehicle> {
  return {
    bandeira, linha, rotulo, distancia
  } as Vehicle;
}
