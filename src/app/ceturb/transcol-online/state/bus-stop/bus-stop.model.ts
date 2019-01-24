export type BusStop = {
  id: number,
  codigo: string,
  municipio: string,
  logradouro: string,
  referencia: string,
  latitude: number,
  longitude: number,
  azimute: number,
  terminal: boolean,
  distancia: number
}

export function createBusStop({
  id = null, codigo = '', municipio = '', logradouro = '', referencia = '', latitude = null, longitude = null, azimute = null, terminal = null, distancia = null
}: BusStop): Partial<BusStop> {
  return {
    id, codigo, municipio, logradouro, referencia, latitude, longitude, azimute, terminal, distancia
  } as BusStop;
}
