<template>
  <div class="wrapper">
    <input placeholder="Type messsage" 
    v-model="newMessage" 
    v-on:keyup.enter="sendMessage" />
  </div>
</template>

<script>
import { API } from '../../config.json'
import axios from 'axios'
export default {
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage == "") {
        alert("No falsy value");
        return;
      }

      const url = API + '/messages/newMessage'
      try {
        const { data } = await axios(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": sessionStorage.getItem('token')
          },
          data: {
            message: this.newMessage
          }
        }) 

        console.log(data)

        this.newMessage = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  flex: 0 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.wrapper input {
  width: 100%;
  height: 2em;
  margin: 1em;
  border-radius: 10px;
  font-size: 100%;
  outline: none;
  border: 1px solid #000;
  background: transparent;
}
</style>