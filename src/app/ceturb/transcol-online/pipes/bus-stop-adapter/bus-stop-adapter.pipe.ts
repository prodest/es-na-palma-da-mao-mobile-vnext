import { Pipe, PipeTransform } from '@angular/core';
import { BusStop as BusStopFromState } from '../../state';
import { BusStop as BusStopFromModel} from '../../model';

@Pipe({ name: 'busStopAdapter' })
export class BusStopAdapterPipe implements PipeTransform {

  constructor() {}

  transform(busStop: BusStopFromState & BusStopFromModel) {
    
    if (busStop['isTerminal'] === undefined) {
      busStop = {
        ...busStop,
        isTerminal: busStop.terminal,
        isPonto: !busStop.terminal,
        descricao: busStop.referencia,
        identificador: busStop.codigo,
        tipo: busStop.terminal ? 'terminal' : 'ponto',
        direcao: busStop.azimute
      }
    } else {
      busStop = {
        ...busStop,
        terminal: busStop.isTerminal,
        referencia: busStop.descricao,
        codigo: busStop.identificador,
        azimute: busStop.direcao
      }
    }
    
    return busStop;
  }
}
