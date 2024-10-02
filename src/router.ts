import { createRouter, createWebHistory } from 'vue-router';
import { homeRoutes } from './modules/home/routes';
import { dataRoutes } from './modules/data/routes';

const routes = [...homeRoutes, ...dataRoutes];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
