<template>
  <input  v-model="searchText" @input="print(e)">
  <!-- {{searchText}} -->
    <div v-for="beer in beersRef" :key="beer.id" class="hello">
    <li>
      <h3>{{beer.name}}</h3>
      <div class="list">
      <div>
        <img :src="beer.image_url" alt="not found" height="200">
      </div>
      <div class="details">
        <div>{{beer.description}}</div>
      </div>
    </div>
    </li>  
    </div>>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import {apiCall} from '@/services/BeerService';
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup (){
    const searchText=ref("");
    const beersRef:any= ref([]);
    apiCall().then(response=>beersRef.value=response.data);
    console.log(apiCall());
    const print=(e: any)=>{
      console.log('gu')
      console.log(searchText.value);
    };
    return{
      beersRef,
      searchText,
      print
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  // margin:50px

  margin-left: 25%;
  margin-right: 25%;
}
h3 {
  margin: 40px 0 0 0;
}
li {
  margin: 20px 0px;
  background-color: lightblue;
  list-style-type: none;
  // display: inline-block;
  /* margin: 0 10px; */

  .list{
    display: flex;
  flex-direction: row;
  .details{
    margin-top: 10px;
      position: relative;
  // top:50px;
    // background-color: blue;
  }
}
}
</style>
