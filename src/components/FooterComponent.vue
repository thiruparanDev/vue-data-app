<template>
      <button @click="()=>{if(decreasePage){decreasePage()}}">Previous</button>
  {{ pageNumberRef }}
  <button @click="()=>{if(increasePage){increasePage()}}">Next</button>
  <div>
    Click count: {{ clickCount }}
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent,ref } from "vue";
  
  export default defineComponent({
    name: "Footer",
    props:{
      pageNumberRef:Number,
      increasePage:Function,
      decreasePage:Function,
      clickCount:Number
    },
    components: {
    },
    setup(){
      // const pageNumberRef:Ref<number> = ref(1);
    }
  });
  </script>

<style lang="scss" scoped>
</style>