import { usePlacesStore } from '@/composables';
import Mapboxgl from 'mapbox-gl';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'MapView',
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error('Div Element no exists');
      if (!userLocation.value) throw new Error('User Location no exists');

      // Chapucilla para resolver el problema que ocurre con el tamaño del mapa al iniciar
      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 17, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({ offset: [0, -25] })
        .setLngLat(userLocation.value)
        .setHTML(`<h4>Ud. esta aquí</h4><h6>${userLocation.value}</h6>`);

      const myLocationMarker = new Mapboxgl.Marker().setLngLat(userLocation.value).setPopup(myLocationPopup).addTo(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (val) => {
      if (isUserLocationReady.value) initMap();
    });

    return {
      userLocation,
      isUserLocationReady,
      mapElement,
    };
  },
});
