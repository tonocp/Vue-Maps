import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1Ijoic3Vpc2VraSIsImEiOiJja3lsa3NsaWUzNnJ5Mm9wOHhjcnpmdXI0In0.WgzHgQxbrmou_9cWWGV-EA',
  },
});

export default directionsApi;
