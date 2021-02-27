<template>
  <div id="app">
    <div class="conversation" v-if="isLoggedIn === true">
      <Messages v-bind:messages="messages"></Messages>
      <SendMessage></SendMessage>
    </div>
    <Authenticate v-else v-on:loggedIn="isLoggedIn = true"/>
  </div>
</template>

<script>
// import axios from 'axios'
import Authenticate from './components/Authenticate.vue'
import Messages from './components/Messages.vue'
import SendMessage from './components/SendMessage.vue'
export default {
  name: 'App',
  data(){
    return {
      messages: [],
      isLoggedIn: false
    }
  },
  components: {
    Authenticate,
    SendMessage,
    Messages,
  },
  mounted(){
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn(){
      let token = sessionStorage.getItem('token')
      if (token){
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    }
  }
}
</script>

<style>
* {
  font-family: monospace;
}

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: #edf1f5;
  font-size: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.conversation{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
}
</style>
