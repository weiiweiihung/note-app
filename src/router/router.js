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
        component:()=> import('@/components/TodoApp.vue'),
    },
    {
        path:'/UserLogin',
        component:()=> import('@/components/UserLogin.vue'),
    }
]

const createRouter = () => new Router({
    mode:'history',
    base:'welcomeTodoApp',
    routes:Routes,
})

const router = createRouter()

export default router