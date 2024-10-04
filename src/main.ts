import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import { createPinia } from 'pinia';
import PCard from './components/p-card.vue';
import PSpinner from './components/p-spinner.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');

app.component('p-card', PCard);
app.component('p-spinner', PSpinner);
