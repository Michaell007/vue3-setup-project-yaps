import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: "/login",
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: 'home',
                component: () => import('@/views/HomeView.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router