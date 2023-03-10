<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <BeerComponent msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BeerComponent from "@/components/BeerComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    BeerComponent
  }
});
</script>
