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
};

export default mutation;
