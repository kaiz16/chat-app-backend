<template>
  <div id="app">
    <div class="conversation">
      <Messages v-bind:messages="messages"></Messages>
      <SendMessage></SendMessage>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
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
    SendMessage,
    Messages,
  },
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
