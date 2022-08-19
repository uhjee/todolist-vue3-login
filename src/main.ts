import { createApp } from 'vue';
import FontAwesomeIcon from '@/plugins/font-awesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// createApp(App).use(store).use(router).mount('#app');

createApp(App)
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
