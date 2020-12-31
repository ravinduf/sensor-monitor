<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to="/" class="navbar-brand">SENSOR MONITOR</router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">

      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <router-link to="/charts" class="nav-link">Charts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Alert</router-link>
        </li>

      </ul>

    </div>

  </nav>
</template>

<script>
  export default {

  }
</script>