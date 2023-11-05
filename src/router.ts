import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import WebsocketPage from './pages/WebsocketPage.vue'

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/websocket',
            name: 'Websocket',
            component: WebsocketPage
        },
    ]
})

export default router
