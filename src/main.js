//import "babel-polyfill"
import { createApp } from 'vue'
import App from './App.vue'


/*import VueCountryIntl from '../lib/vue3CountryIntl.js';
import '../lib/vue3CountryIntl.css';

console.log('Vue3CountryIntl', VueCountryIntl);*/

const app = createApp(App);

// app.component('VueCountryIntl', VueCountryIntl)


app.mount('#app')
