import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import { createPinia } from 'pinia';
import PCard from './components/p-card.vue';
import PSpinner from './components/p-spinner.vue';
import PSidebar from './components/p-sidebar.vue';
import PNavItem from './components/p-nav-item.vue';
import PLozenge from './components/p-lozenge.vue';

const pinia = createPinia();
const app = createApp(App);

app.component('p-card', PCard);
app.component('p-sidebar', PSidebar);
app.component('p-spinner', PSpinner);
app.component('p-nav-item', PNavItem);
app.component('p-lozenge', PLozenge);

app.use(router);
app.use(pinia);
app.mount('#app');
