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

  setDistanceDuration(state: MapState, { distance, duration }: { distance: number; duration: number }) {
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    state.distance = kms;
    state.duration = Math.floor(duration / 60);
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

    if (state.map.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyline(state: MapState, coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    const bounds = new Mapboxgl.LngLatBounds([start[0], start[1]], [start[0], start[1]]);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    const sourceData: Mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'green',
        'line-width': 7,
      },
    });
  },
};

export default mutation;
