
<template>
  <v-card max-width="700" class="mx-auto">

    <!-- Affiche les messages --> 
    <v-list three-line>
      <template v-for="(item, index) in items">
        <!-- Ajoute une séparation entre les messages --> 
        <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-if="item.avatar" :key="item.avatar">        
          <v-list-item-avatar>
            <v-avatar color="primary">
              <span class="white--text headline">{{item.avatar}}</span>
            </v-avatar>
          </v-list-item-avatar>
          <!-- Ajoute le message, l'avatar, l'userId, l'heure et le jour --> 
          <v-list-item-content>
            <v-list-item-title v-html="'<b>' + item.username + '</b>' + ' - ' + item.day + ' à ' + item.time"></v-list-item-title>
            <v-list-item-subtitle v-html="item.message"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </template>
    </v-list>

    <!-- Créer un nouveau message par une boite de dialogue --> 
    <v-dialog v-model="dialog" max-width="800px" >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>             
          Nouveau message
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau message</span>
        </v-card-title>
        <tiptap-vuetify v-model="content" :extensions="extensions"/>  <!-- Référence au WYSIWYG -->                               
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="sendMessage"><v-icon>mdi-send</v-icon>Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
  
</template>

<script>
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

import firebase from "firebase";

export default {
  name: "Message",
  components: {
    TiptapVuetify
  },
  
   data: () => ({
      items: [],
      dialog: false,
      content: '',
      username:[],
      extensions: [
      // Render in the Bubble menu
      [Link,{renderIn: 'bubbleMenu'}],
      [Underline,{renderIn: 'bubbleMenu'}],
      [Strike,{renderIn: 'bubbleMenu'}],
      [Bold,{renderIn: 'bubbleMenu',options: {levels: [1, 2, 3]}}],
      // Render in the toolbar
      [Blockquote,{renderIn: 'toolbar'}],
      // You can use a short form, the default "renderIn" is "'toolbar'"
      History,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      // Options that fall into the tiptap's extension
      [Heading,{options: {levels: [1, 2, 3]}}],
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak // line break on Shift + Ctrl + Enter
    ],
    
    }),

  methods: {  
      sendMessage() {
      // Défini des variables temporelles et d'id utilisateur
      const user = firebase.auth().currentUser.uid;
      const time = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleTimeString('fr');
      const day = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleDateString('fr'); 
      const useraccount = this.$store.state.username;
      const avatar = useraccount.charAt(0) + useraccount.charAt(useraccount.indexOf(" ") +1)
      
      // écrit les champs utiles dans la base de donnée
      let ref = firebase.database().ref("messages");
      const message = {
        userid: user,
        username: useraccount,
        message: this.content,
        time: time,
        day: day,
        avatar: avatar,
        divider: true,
        inset : true,
      };
      
      ref.push(message)

      // Enlève l'interface WYSIWYG
      this.dialog = false;
      this.content= '';
    },
    
  },
 
  mounted() {
    let viewMessage = this;
    const itemsRef = firebase.database().ref("/messages").orderByKey();
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          userid: data[key].userid,
          username: data[key].username,      
          message: data[key].message,
          time: data[key].time,
          day: data[key].day,
          avatar: data[key].avatar,
          divider: data[key].divider,
          inset: data[key].inset,
        });
      });
      viewMessage.items = messages;
    });
  }
  

};
</script>

<style scoped>
    #new_message{
        margin-left: 5%;
    }
</style>