<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import store from '@/store';
export default defineComponent({
  name: "Home",
  components: {
  },
  setup() {
    onMounted(() => {
      const filters = localStorage.getItem('filters');
      const pageNumber = localStorage.getItem('pageNumber');
      const clickCount = localStorage.getItem('clickCount');
      if (filters) {
        store.dispatch('setFilters', JSON.parse(filters));
      }
      if (pageNumber) {
        store.dispatch('setPageNumber', JSON.parse(pageNumber)); 
      }
      if (clickCount) {
        store.dispatch('setClickCount', JSON.parse(clickCount));
      }
    });
  }
});
</script>
<style>
#app {
  /* background-color: orange; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* padding: 30px; */
  /* background-color: orange; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
