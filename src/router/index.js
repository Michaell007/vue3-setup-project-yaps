import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: "/login",
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    auth :true
                },
            },
            {
                path: 'profil-liste',
                name: 'profil-liste',
                component: () => import('@/views/ProfileView.vue')
            },
            {
                path: 'profil-creer',
                name: 'profil-creer',
                component: () => import('@/views/ProfileCreateView.vue')
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

router.beforeEach((to, from, next) => {
    const loggedIn = false
   
    if (to.meta.auth && !loggedIn) {
      next('/login');
    } else {
      next();
    }
})

export default router