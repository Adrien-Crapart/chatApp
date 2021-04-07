<template>
  <div id="app">
    <mytoolbar/>
    <chatinterface/>
  </div>
</template>

<script>
import mytoolbar from "@/components/MyToolbar.vue"
import chatinterface from "@/components/Chat_interface.vue"
export default {
  name: "Message",
  components: {
    mytoolbar,
    chatinterface
  },
};
</script>

<style scoped>
    #chatinterface{
        margin-left: 5%;
    }
</style>