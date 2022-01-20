import { computed } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/store';
import Mapboxgl from 'mapbox-gl';
import { Feature } from '@/interfaces/places';

export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),

    // GETTERS
    isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),

    // MUTATIONS
    setMap: (map: Mapboxgl.Map) => store.commit('map/setMap', map),
    setPlaceMarkers: (places: Feature[]) => store.commit('map/setPlaceMarkers', places),

    // ACTIONS
  };
};
