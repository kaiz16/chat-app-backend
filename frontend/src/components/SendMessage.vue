<template>
  <div class="wrapper">
    <input placeholder="Type messsage" v-model="newMessage" v-on:keyup.enter.prevent="sendMessage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: ""
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage == "") {
        alert("No falsy value");
        return;
      }
      this.$emit("sendMessage", this.newMessage);
      this.newMessage = "";
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