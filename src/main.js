// Import des modules standards de VueJS
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

// Import des plugins tiptapVuetify 
import './plugins/tiptap-vuetify';
import './plugins/gtag';
import firebase from "firebase";
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyCPVAT-ddDKxmHmUOmLPhH_snZ52x7tNRk",
    authDomain: "fullstackjs-3786c.firebaseapp.com",
    databaseURL: "https://fullstackjs-3786c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fullstackjs-3786c",
    storageBucket: "fullstackjs-3786c.appspot.com",
    messagingSenderId: "196990026970",
    appId: "1:196990026970:web:b2b415db8e7e3db673d1e3",
    measurementId: "G-XB0PE2M9S4"
};

var fire = firebase.initializeApp(config);


new Vue({
    vuetify,
    router,
    store,
    fire,
    render: h => h(App)
}).$mount('#app')

export default fire;