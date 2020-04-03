import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    routes,
    mode: process.env.HISTORY_MODE ? 'history' : 'hash'
});

export default router;
