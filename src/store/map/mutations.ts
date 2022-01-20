import { Feature } from '@/interfaces/places';
import Mapboxgl from 'mapbox-gl';
import { MutationTree } from 'vuex';
import { MapState } from './state';

const mutation: MutationTree<MapState> = {
  someMutation(/* state: ExampleStateInterface */) {
    // a line to prevent linter errors
  },

  setMap(state: MapState, map: Mapboxgl.Map) {
    state.map = map;
  },

  setPlaceMarkers(state: MapState, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];

    if (!state.map) return;

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Mapboxgl.Popup({ offset: [0, -25] })
        .setLngLat([lng, lat])
        .setHTML(`<h4>${place.text}</h4><h6>${place.place_name}</h6>`);

      const marker = new Mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(state.map);

      state.markers.push(marker);
    }
  },
};

export default mutation;
