<template>
  <div class="welcome container">
    <p>Welcome</p>

    <div v-if="!isSignIn">
      <h2>Sign up</h2>
      <SignupForm/>
    </div>

    <div v-if="isSignIn">
      <h2>Login</h2>
      <LoginForm/>
    </div>

    <div @click="isSignIn = !isSignIn" class="toggle">
      <p>{{ isSignIn ? 'create a new account' : 'login with current one' }}</p>
    </div>

  </div>
</template>

<script>
import {ref} from 'vue';
import SignupForm from "@/components/SignupForm";
import LoginForm from "@/components/LoginForm";

export default {
  name: "Welcome",
  components: {
    SignupForm,
    LoginForm,
  },
  setup() {
    const isSignIn = ref(false);

    return {
      isSignIn: isSignIn
    }
  }
}
</script>

<style>
  .welcome{
    text-align: center;
    padding: 20px 0;
  }
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome .toggle {
    font-weight: bold;
    cursor: pointer;
  }
</style>