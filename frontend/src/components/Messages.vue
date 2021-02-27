<template>
  <div class="wrapper">
    <div class="chat" v-for="chat in messages" v-bind:key="chat._id">
      <span class="name">{{ chat.username }}</span>
      <span class="time">{{' at ' + (new Date).getHours() + ':' + (new Date).getMinutes()}}</span>
      <p
        class="message"
      >{{ chat.message }}</p>
    </div>
  </div>
</template>

<script>

import { API, WS } from '../../config.json'

const io = require('socket.io-client')
const socket = io(WS);

import axios from 'axios';
export default {
  data(){
    return {
      messages: []
    }
  },
  mounted(){
    this.fetchMessages()
    socket.on("incomingNewMessage", (message) => {
      this.messages.push(message)
      // after dom update
      this.$nextTick( () => {
        this.scroll()
      })
    })
  },
  methods: {
    scroll(){
      let chats = document.querySelectorAll('.chat')
      chats[chats.length - 1].
      scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    },
    async fetchMessages(){
      const url = API + '/messages'

      const { data } = await axios(url, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'authorization': sessionStorage.getItem('token')
        }
      })

      if (data.length){
        this.messages = data
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  width: 100%;
}

.chat {
  padding: 10px;
  margin: 10px;
}

.chat .message {
  background: #fff;
  color: #000;
  padding: 10px;
  border-radius: 0 10px 10px 10px;
  width: fit-content;
}

.chat .time {
    color: #9399a1;
}

p {
  margin: 0;
}
</style>