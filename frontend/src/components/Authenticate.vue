<template>
  <div class="wrapper">
    <div class="card">
      <input
        type="text"
        class="username"
        placeholder="Username"
        name="username"
        v-model="username"
      />

      <input class="password" placeholder="Password" type="password" name="password" v-model="password" />

      <button>Login</button>
      <button>Sign up</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  padding: 1rem;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.card > * {
  margin: 0.5rem;
}

input {
  height: 2em;
  outline: none;
}

button {
    height: 3em;
    background: #edf1f5;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    transition: all 0.2s ease-in-out;
}

button:hover {
    background: #fff;
}
</style>