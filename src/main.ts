import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoic3Vpc2VraSIsImEiOiJja3lsa3NsaWUzNnJ5Mm9wOHhjcnpmdXI0In0.WgzHgQxbrmou_9cWWGV-EA';

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la geolocalización');
  throw new Error('Tu navegador no soporta la geolocalización');
}

createApp(App).use(store).mount('#app');
