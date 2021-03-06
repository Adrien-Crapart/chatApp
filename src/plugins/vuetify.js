import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        // If you change the language here, then it changes in the editor itself
        current: 'fr' // en | es | fr | pl | ru
    }
})