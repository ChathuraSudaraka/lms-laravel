import "./bootstrap";
import "../css/app.css";

import PrimeVue from "primevue/config";
import { Omega } from "./Theme/Omega";
import VueApexCharts from 'vue3-apexcharts'
import 'primeicons/primeicons.css'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'

import { createPinia } from 'pinia'

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const pinia = createPinia()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(VueApexCharts)
            .use(pinia)
            .use(PrimeVue, { 
                theme: { 
                    preset: Omega,
                    options: {
                        darkModeSelector: false || 'none'
                    }
                }, 
                ripple: true 
            })
            .use(ToastService) // Add this line
            .directive('tooltip', Tooltip)
            .mount(el);
        return app;
    },
    progress: {
        color: "#4B5563",
    },
});
