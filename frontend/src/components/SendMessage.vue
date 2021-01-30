<template>
  <div class="input">
    <input type="text" v-model="newMessage" v-on:keyup.enter="sendMessage"/>
  </div>
</template>

<script>
export default {
    data(){
        return {
            newMessage: ''
        }
    },
    methods: {
        sendMessage(){
            if (this.newMessage == ''){
                alert('No falsy value')
                return
            }
            this.$emit('sendMessage', this.newMessage)
            this.newMessage = ''
        }
    }
};
</script>

<style>
.input{
  margin-bottom: 20px;
}
</style>