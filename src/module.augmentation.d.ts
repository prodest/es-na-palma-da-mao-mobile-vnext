import * as L from 'leaflet';
import { BusStop as BusStopModel } from 'src/app/ceturb/model';
// leaflet-pulse-icon plugin
declare module 'leaflet' {
  export namespace Icon {
    interface PulseIconOptions extends BaseIconOptions {
      className?: string;
      iconSize?: [number, number];
      color?: string;
      animate?: boolean;
      heartbeat?: number;
    }

    interface BusStopIconOptions extends BaseIconOptions {
      role?: 'default' | 'secondary' | 'origin' | 'destination' | 'available-destination';
      direction?: number;
      spin?: boolean;
      type?: 'ponto' | 'terminal';
    }

    class Pulse extends DivIcon {
      constructor(options?: PulseIconOptions);
    }

    class BusStop extends DivIcon {
      constructor(options?: BusStopIconOptions);
    }
  }

  export namespace Marker {
    class Pulse extends Marker {
      constructor(latlng: LatLng, options: Icon.PulseIconOptions);
    }

    class BusStop extends Marker {
      stop: BusStopModel;
      constructor(stop: BusStopModel, options: MarkerOptions);
    }
  }

  export namespace icon {
    export function pulse(options: Icon.PulseIconOptions): Icon.Pulse;
    export function busStop(options: Icon.BusStopIconOptions): Icon.BusStop;
  }

  export namespace marker {
    export function pulse(latlng: LatLng, options: Icon.PulseIconOptions): Marker.Pulse;
    export function busStop(stop: BusStopModel, options: MarkerOptions): Marker.BusStop;
  }
}
