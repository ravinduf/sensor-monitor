<template>

  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email"/>
    <input type="password" required placeholder="password" v-model="password"/>
    <button>Log In</button>
  </form>

</template>

<script>
  import axios from "axios";
export default {
  name: "LoginForm",
  data(){
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    handleSubmit(){
      axios.post('http://localhost:5000/signin',{
        'email': this.email,
        'password': this.password
      }).then(res => {

        this.$router.push('/charts');

      }).catch(err => {

        console.log(err);

      })
    }
  },
}
</script>

<style scoped>

</style>