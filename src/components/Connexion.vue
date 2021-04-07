<template>
<v-card style="padding:40px;">
    <form @submit.prevent="login">  <!-- directive V-on pour l'envois du formulaire -->
      <h1>Se connecter à votre compte</h1>
      <!-- Input de l'adresse email -->
      <v-text-field id="email" type="email" class="form-control" name="email" value v-model="form.email" label="Adresse mail" required autofocus></v-text-field>
      <!-- Input du mot de passe -->
      <v-text-field id="password" type="password" class="form-control" name="password" v-model="form.password" label="Mot de passe" required></v-text-field>    
      <div class="valid-form">
      <!-- Bouton de connexion -->
      <v-btn type="submit" @click="submit">Connexion</v-btn> <!-- directive V-on pour annuler -->
      <register/> <!-- Bouton de création de compte -->
      <v-alert class='alert-connection' v-if="connect == 1" dense text type="error">{{error}}</v-alert>
      </div>
    </form>  
</v-card>
</template>

<script>
import register from "@/components/Register";
import firebase from "firebase";

export default {
  name: "login",
  components: { 
    register 
  },
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
    // Gère la connexion d'un utilisateur déjà enregistré
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {  

          // Obtiens le nom de l'utilisateur pour le stocker dans le store
          const user = firebase.auth().currentUser.uid;
          const usersRef = firebase.database().ref("/Users").orderByKey();
          usersRef.on("value", snapshot => {
            let data = snapshot.val();
            Object.keys(data).forEach(key => {
              if (user == data[key].userId){
                  console.log(data[key].username)
                  this.$store.commit('userName', (data[key].username));               
                }                   
            });
          }); 
          this.$router.push('/messages');
        })
        .catch(error => {
          this.connect = 1
          this.error.push(error.message);
        });
    },
    
  },
  
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
  .alert-connection{
    margin-top: 20px;
  }
  .valid-form{
    margin-top: 20px;
  }
</style>