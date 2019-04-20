import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
 
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.googleMapsKey,
    libraries: 'places',
  },
})
