import { useStore } from 'vuex';
import { StateInterface } from '@/store/index';
import { computed, onMounted } from 'vue';

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters['places/isUserLocationReady']) {
      store.dispatch('places/getInitialLocation');
    }
  });

  return {
    // STATE
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),

    // GETTERS
    isUserLocationReady: computed<boolean>(() => store.getters['places/isUserLocationReady']),

    // ACTIONS
    searchPlacesByTerm: (query = '') => store.dispatch('places/searchPlacesByTerm', query),

    // MUTATIONS
  };
};
