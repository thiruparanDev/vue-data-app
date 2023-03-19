<template>
      <div v-for="beer in beersRef" :key="beer.id" class="hello">
    <li @click="showPopup(beer)">
      <h3>{{ beer.name }}</h3>
    </li>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent,PropType,ref, onMounted } from "vue";
  
  export default defineComponent({
    name: "Body",
    components: {
    },
    props:{
      beersRef:Object as PropType<any>,
      showPopup:Function
    },
    setup(props) {
      return{
      };
    }
  });
  </script>

<style lang="scss" scoped>
.hello {
  // margin:50px
  background-color: rgb(226, 218, 218);
  min-width: 10px;
  margin-left: 25%;
  margin-right: 25%;
}
li {
  // margin: 20px 0px;
  // background-color: lightblue;
  list-style-type: none;

  &:hover {
    cursor: pointer;
  }

  .list {
    display: flex;
    flex-direction: row;

    .details {
      margin-top: 10px;
      position: relative;
    }
  }

}
</style>