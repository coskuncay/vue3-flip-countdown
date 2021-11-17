<template>
  <Countdown deadline="2021-12-12 00:00:00" />
</template>

<script>
import Countdown from './Countdown.vue'

export default {
  name: 'App',
  components: {
    Countdown
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
