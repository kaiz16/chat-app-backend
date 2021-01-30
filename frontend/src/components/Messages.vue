<template>
    <div class="messages">
        <div class="box"  v-for="(message, index) in messages" v-bind:key="index">
            <p>{{message.msg}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['messages']
}
</script>

<style>
.messages{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  align-items: center;
  width: 100%;
}

.box{
    background: #2d2d2d;
    margin: 10px;
    color: #cdcdcd;
    padding: 10px;
    font-size: .75em;
    border-radius: 10px;
    width: fit-content;
}

p{
    margin: 0
}
</style>