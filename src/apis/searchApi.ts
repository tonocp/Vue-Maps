import axios from 'axios';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    access_token: 'pk.eyJ1Ijoic3Vpc2VraSIsImEiOiJja3lsa3NsaWUzNnJ5Mm9wOHhjcnpmdXI0In0.WgzHgQxbrmou_9cWWGV-EA',
  },
});

export default searchApi;
