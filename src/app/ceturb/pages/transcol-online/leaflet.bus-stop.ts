import * as L from 'leaflet';

(function(window) {
  /**
   *
   *
   */
  L.Icon.BusStop = L.DivIcon.extend({
    options: {
      role: 'default',
      iconSize: [32, 32],
      html: '<i class="fa fa-bus" aria-hidden="true"></i> <div class="azimute"></div>'
    },

    initialize: function(options) {
      (L as any).setOptions(this, options);
      this.options.className = `marker dir-${options.direction} marker-${options.role} marker-${options.type}`;
    }
  });

  /**
   *
   *
   */
  L.icon.busStop = function(options) {
    return new L.Icon.BusStop(options);
  };

  /**
   *
   *
   */
  L.Marker.BusStop = L.Marker.extend({
    initialize: function(stop, options) {
      this.stop = stop;
      (L.Marker.prototype as any).initialize.call(this, L.latLng(stop.latitude, stop.longitude), options);
    }
  });

  /**
   *
   *
   */
  L.marker.busStop = function(stop, options) {
    return new L.Marker.BusStop(stop, options);
  };
})(window);
