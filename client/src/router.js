import { homeState } from 'home';
import { settingsState } from 'settings';
import { UIRouterReact, servicesPlugin, pushStateLocationPlugin } from '@uirouter/react';
import App from './App';

export const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

const app = {
    name: 'app',
    redirectTo: 'welcome',
    component: App,
};

const routes = [
    app,
    homeState,
    settingsState
]

routes.forEach(route => router.stateRegistry.register(route));