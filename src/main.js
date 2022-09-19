import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from './router/router.js'
import vuetify from './plugins/vuetify'
import Notification from 'vue-notification'

Vue.use(Notification);

new Vue({
    router,
    vuetify,
    Notification,
    render:s =>s(App)
}).$mount('#app')

