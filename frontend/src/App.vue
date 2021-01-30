<template>
  <div id="app">
    <h1>Chat App</h1>
    <message-component v-bind:messages="messages"></message-component>
    <send-message v-on:sendMessage="sendNewMessage"></send-message>
  </div>
</template>

<script>
import axios from 'axios'
import SendMessage from './components/SendMessage.vue'
import Messages from './components/Messages.vue'
export default {
  name: 'App',
  data(){
    return {
      messages: []
    }
  },
  components: {
    'send-message': SendMessage,
    'message-component': Messages
  },
  mounted(){
    setInterval(() => {
      this.getMessages()
    }, 1000);
  },
  methods: {
    getMessages(){
      axios({
        url: 'http://localhost:3000/messages',
        method: 'get'
      }).then( data => {
         this.messages = data.data
      })
    },
    sendNewMessage(message){
      axios({
        url: 'http://localhost:3000/newMessage',
        method: 'post',
        data: {
          msg: message
        }
      }).then( data => {
         this.messages.push(data.data)
      })
    }
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>
