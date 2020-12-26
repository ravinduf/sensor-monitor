<template>

  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="display name" v-model="name"/>
    <input type="email" required placeholder="email" v-model="email"/>
    <input type="password" required placeholder="password" v-model="password"/>
    <button>Sign up</button>
  </form>

</template>

<script>
import {ref} from 'vue';

export default {
  name: "SignupForm",
  setup(){
    const name = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log(name.value);
      console.log(email.value);
      console.log(password.value);
    }

    return {
      name: name,
      email: email,
      password: password,
      handleSubmit: handleSubmit
    }
  }
}
</script>

<style scoped>

</style>