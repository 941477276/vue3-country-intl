//import "babel-polyfill"
import { createApp } from 'vue'
import App from './App.vue'

/*import Vue3CountryIntl from '../lib/vue3-country-intl.es';
import '../lib/vue3-country-intl.css';

console.log('Vue3CountryIntl', Vue3CountryIntl);*/

const app = createApp(App);

// app.component(Vue3CountryIntl.name, Vue3CountryIntl)


app.mount('#app')
