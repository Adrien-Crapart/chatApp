import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Messages from '@/views/Messages';
import firebase from 'firebase';

Vue.use(VueRouter)

// Gère les routes des 2 pages à visualiser
const routes = [{
        path: '/',
        name: 'login',
        component: Login,
        meta: {
            guest: true // En tant qu'invité
        }
    },
    {
        path: '/messages',
        name: 'messages',
        component: Messages,
        meta: {
            requiresAuth: true // En tant qu'utilisateur enregistré
        }
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// Défini des règles de restrictions sur les routes, oblige à être connecter
router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(r => r.meta.requiresAuth);
    console.log("CURRENTUSER", currentUser);
    if (!currentUser && requiresAuth) {
        next('/'); // Si c'est un mauvais mdp ou un utilisateur non enregistré
    } else {
        next(); // Sinon la page de messagerie s'affiche
    }
});




export default router