import { createStore } from 'vuex';

// My custom modules
import mapModule from './map';
import { MapState } from './map/state';

import placesModule from './places';
import { PlacesState } from './places/state';

export interface StateInterface {
  map: MapState;
  places: PlacesState;
}

export default createStore<StateInterface>({
  modules: {
    map: mapModule,
    places: placesModule,
  },
});
