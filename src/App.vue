<template>
  <Home />

  <img alt="Vue logo" src="./assets/logo.png" class="logo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './views/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
});
</script>

<style>
.logo {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 100px;
}
</style>
