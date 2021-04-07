<template>
<!-- Bouton de création d'un nouvel utilisateur -->
      <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-2" color="primary" dark v-bind="attrs" v-on="on">Pas encore inscrit ?</v-btn>
      </template>
      <form @submit.prevent="register">
     
      <v-card>
        <v-card-title>
          <span class="headline">Création d'un compte</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field type="text" class="form-control" v-model="form.surname" label="Prénom *" required autofocus>></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field type="text" class="form-control" v-model="form.name" label="Nom *"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field id="email" type="email" class="form-control" name="email" value v-model="form.email" label="Adresse mail*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="password" class="form-control" v-model="form.password" label="Mot de passe *" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6"></v-col>
            </v-row>
          </v-container>
          <small>* Champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn> <!-- directive V-on pour annuler -->
          <v-btn color="blue darken-1" text @click="register">Enregistrer</v-btn> <!-- directive V-on pour envoyer -->
        </v-card-actions>
      </v-card>
      </form> 
    </v-dialog>
</template>

<script>
import firebase from "firebase";

export default {

  data: () => {
    return {
      dialog: false,
      form: {
        surname:"",
        name:"",
        email: "",
        password: ""
      },
      error: [],
      connect: 0,
    };
  },
  computed: {
 
  },
  methods: {
    // Gère l'enregistrement d'un nouvel utilisateur
    register() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.form.email, this.form.password)
      .then(() => {      
        //alert('Enregistrement réussi! Veuillez maintenant vous connecter.');        
        this.dialog =false;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            var user = firebase.auth().currentUser;
            const account = {
            userId: user.uid,
            username: this.form.surname + ' ' + this.form.name,
            email: this.form.email
          };
          firebase
            .database()
            .ref("Users")
            .push(account);  
          this.$router.push('/messages');                    
          })
          .catch(error => {
            alert(error.message);
          });        
      })

      .catch(error => {
        alert(error.message);
      });
      
    },
}
}
</script>

<style scoped>
  .home{
    margin: auto;
    text-align: center;
  }
  .home > h1, .home > h2, .home > h3 {
    color: white;
  }
  #app{
    margin: auto;
    width: 40%;
    text-align: center;
    align-content: center;
    margin: auto;
  }
</style>