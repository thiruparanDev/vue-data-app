<template>
  <div><input  v-model="searchText" placeholder="Enter text">
  </div>
  <div>
    <input v-model="monthRef" placeholder="mm-yyyy ">
  </div>
  <button @click="onSearch">Search</button>
  
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
import { defineComponent,ref, onMounted } from "vue";
import {apiCall} from '@/services/BeerService';
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  components:{
  },
  setup (){
    const searchText=ref("");
    const beersRef:any= ref([]);
    const monthRef:any= ref("");
    onMounted(()=>{
      apiCall().then(response=>beersRef.value=response);
      console.log(beersRef.value);
    });

    // const print=(e: any)=>{
    //   // console.log('gu')
    //   console.log(searchText.value);
    // };

    const onSearch = ()=>{
      console.log(monthRef.value);
      let text ="";
      let period ="";
      if (searchText.value){
        text = searchText.value.replace(/ /g,"_");
        text='beer_name='+text;
        // beforeApiCall(`beer_name=${replacedText}`);
      }
      if (monthRef.value){
        period=monthRef.value;
        period='brewed_before='+period;
      }
      apiCall(text,period).then(response=>beersRef.value=response);
      console.log(beersRef.value);
      // console.log(searchText.value);
    };

    // const beforeApiCall = (text?: string, period: any)=>{
    //   apiCall(text, period).then(response=>beersRef.value=response);
    // };

    return{
      beersRef,
      monthRef,
      searchText,
      print,
      onSearch
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
