import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const Routes= [
    {
        path:'/',
        component:()=> import('@/components/HelloWorld.vue'),
    },
    {
        path:'/TodoApp',
        component:()=> import('@/pages/TodoApp.vue'),
    },
    {
        path:'/UserLogin',
        component:()=> import('@/pages/UserLogin.vue'),
    }
    ,
    {
        path:'/UserRegister',
        component:()=> import('@/pages/UserRegister.vue'),
    }
]

const createRouter = () => new Router({
    mode:'history',
    base: process.env.VUE_APP_BASE_URL,
    routes:Routes,
})

const router = createRouter()

export default router