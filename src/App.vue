<template>
  <div id="app">
    <CountriesCities />
  </div>
</template>

<script>
import CountriesCities from "./components/CountriesCities.vue";

export default {
  name: "App",
  components: {
    CountriesCities,
  },
};
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
