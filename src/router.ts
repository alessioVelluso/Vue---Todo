import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Options from './views/Options.vue'
import { useAuthStore } from './stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/options', component: Options },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.path !== '/login' && !authStore.isAuth) next('/login')
    else if (to.path === '/login' && authStore.isAuth) next('/')
    else next()
})


export default router
