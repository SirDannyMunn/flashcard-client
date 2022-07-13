import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {createStore} from './store'
import axios, {AxiosRequestConfig} from 'axios';
import {authConfig, baseUrl, apiEndpoint} from "@/config";
import registerComponents from './components/_index';
import './bootstrap';

import {createAuth0} from '@auth0/auth0-vue';

const auth0 = createAuth0({
    domain: authConfig.domain,
    client_id: authConfig.clientId,
    audience: authConfig.audience,
    redirect_uri: authConfig.callbackUrl,
    // scope: authConfig.scope,
    useRefreshTokens: true,
    cacheLocation: 'localstorage'
});

const app = createApp(App);

// Auth & axios setup
app.config.globalProperties.$auth = auth0;


app.config.globalProperties.$axios = axios;
app.config.globalProperties.$axios.defaults.baseURL = apiEndpoint

app.config.globalProperties.$axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        if (config.headers && app.config.globalProperties.$auth.isAuthenticated) {
            const authToken = await app.config.globalProperties.$auth.getAccessTokenSilently()
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

app.config.globalProperties.$baseUrl = baseUrl;
app.config.globalProperties.$apiEndpoint = apiEndpoint;

const store = createStore(app)
registerComponents(app)
app.use(auth0);
app.use(router);
app.use(store);
app.mount('#app');
