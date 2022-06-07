import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios';

import { createAuth0 } from '@auth0/auth0-vue';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;


const app = createApp(App);

app.use(
    createAuth0({
        domain: "dev-yvbchxqk.us.auth0.com",
        client_id: "6mswiYmAkmqREOds7qwutwgAIdjQvo91",
        redirect_uri: window.location.origin
    })
);

app.use(store).use(router)

app.mount('#app');
