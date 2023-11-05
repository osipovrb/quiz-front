import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import socket from 'vue3-websocket'

const app = createApp(App)

// Router
app.use(router)
     
// WS
app.use(socket, {
    secured: false,
    host: `${window.location.hostname}:6001/chat`,
    reconnect: true,
    reconnectTime: 3,
}) 

// mount
app.mount('#app')
