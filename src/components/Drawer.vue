<template>
  <div>
    <!-- Affiche la liste des onglets sur la gauche de la page -->
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-item ripple :to="item.action" :key="i" v-else>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2" @click="signOut()">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'drawer',
  data: function () {
    return {
      items: [
        { icon: 'mdi-account', text:'Se déconnecter' },
        { icon: 'mdi-message-text', text: 'Messagerie', action: '/messages' }
      ],
    };
  },
  methods: {
    // Gère la déconnexion d'un utilisateur déjà enregistré
    signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.commit('userName', ''); 
            this.$router.push('/');
          })
          .catch(error_log => {
          alert(error_log.message);
          });       
    },
  },
};
</script>
 