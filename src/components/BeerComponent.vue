<template>
  <div :class="{container:showPopupRef}">
    <div v-if="!showPopupRef">
  <div ><input v-model="searchText" placeholder="Enter text">
  </div>
  <div>
    <input v-model="monthRef" placeholder="mm-yyyy ">
  </div>
  <div>
    <input v-model="yeastRef" placeholder="yeast name ">
  </div>
  <div>
    <input v-model="abvGtRef" placeholder="alcohol percentage greater than ">
  </div>
  <button @click="onSearch">Search</button>
</div>
  <!-- {{searchText}} -->
  <PopUp v-if="showPopupRef" :closePopUp="closePopUp" :selectedBeer="selectedBeerRef"/>
  <div v-for="beer in beersRef" :key="beer.id" class="hello">
    <li @click="showPopup(beer)">
      <h3>{{ beer.name }}</h3>
      <!-- <div class="list">
        <div>
          <img :src="beer.image_url" alt="not found" height="200">
        </div>
        <div class="details">
          <div>{{ beer.description }}</div>
          <div>{{ beer.first_brewed }}</div>
          <div>{{ beer.ingredients.yeast }}</div>
          <div>{{ beer.abv }}</div>
        </div>
      </div> -->
    </li>
  </div>
  <button @click="decreasePage" v-if="!showPopupRef">Previous</button>
  {{ pageNumberRef }}
  <button @click="increasePage" v-if="!showPopupRef">Next</button>
  <div>
    Click count: {{clickCount}}
  </div>
</div>
</template>

<script  lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Ref } from 'vue';
import { apiCall } from '@/services/BeerService';
import PopUp from "./PopUp.vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    PopUp
  },
  setup() {
    const searchText: any = ref("");
    const beersRef: any = ref([]);
    const monthRef: any = ref("");
    const yeastRef: any = ref("");
    const abvGtRef: any = ref();
    const pageNumberRef: any = ref(1);
    const showPopupRef: any = ref(false);
    const selectedBeerRef: any=ref("");
    const clickCount:any=ref(0);
    onMounted(() => {
      let savedItem=localStorage.getItem('savedItem');
      if (savedItem!==null){
        const savedItem1:Saved=JSON.parse(savedItem);
        // console.log(savedItem?.searchText);
        searchText.value=savedItem1?.searchText;
        monthRef.value=savedItem1.monthRef;
        yeastRef.value=savedItem1.yeastRef;
        abvGtRef.value=savedItem1.abvGtRef;
        pageNumberRef.value=savedItem1.pageNumberRef;
        // showPopupRef.value=savedItem1.showPopupRef;
        // selectedBeerRef.value=savedItem1.selectedBeerRef;
        clickCount.value=savedItem1.clickCount;
    
      }
      getData();
      // apiCall().then(response => beersRef.value = response);
      // console.log(beersRef.value);
    });

    // const print=(e: any)=>{
    //   // console.log('gu')
    //   console.log(searchText.value);
    // };
    const decreasePage = () => {
      if (pageNumberRef.value > 1) {
        pageNumberRef.value--;
        getData();
      }
    };
    const increasePage = () => {
      pageNumberRef.value++;
      getData();
    };
    const showPopup = (beer: any) => {
      showPopupRef.value = true;
      selectedBeerRef.value=beer;
      console.log(showPopupRef.value);
      clickCount.value++;
      saveSettings();
    };
    const closePopUp=()=>{
      showPopupRef.value = false;
    };
    const onSearch = () => {
      pageNumberRef.value = 1;
      getData();
    };
    interface Saved  {
      searchText: any;
      monthRef: any;
      yeastRef: any;
      abvGtRef: any;
      pageNumberRef: any;
      // showPopupRef: any;
      // selectedBeerRef: any;
      clickCount: any
    }
    const saveSettings=()=>{
      const saved: Saved={searchText:searchText.value,monthRef:monthRef.value,yeastRef:yeastRef.value,abvGtRef:abvGtRef.value,pageNumberRef:pageNumberRef.value, clickCount:clickCount.value};
      localStorage.setItem('savedItem',JSON.stringify(saved));
      // localStorage.setItem('beersRef',beersRef.value);
      // localStorage.setItem('searchtext',searchText.value);
      // localStorage.setItem('monthRef',monthRef.value);
      // localStorage.setItem('yeastRef',yeastRef.value);
      // localStorage.setItem('abvGtRef',abvGtRef.value);
      // localStorage.setItem('pageNumberRef',pageNumberRef.value);
      // localStorage.setItem('showPopupRef',showPopupRef.value);
      // localStorage.setItem('selectedBeerRef',JSON.stringify(selectedBeerRef.value));
    };
    const getData = () => {
      console.log(monthRef.value);
      let text = "";
      let period = "";
      let yeast = "";
      let abvGt = "";
      if (searchText.value) {
        text = searchText.value.replace(/ /g, "_");
        text = 'beer_name=' + text;
        // beforeApiCall(`beer_name=${replacedText}`);
      }
      if (monthRef.value) {
        period = monthRef.value;
        period = 'brewed_before=' + period;
      }
      if (yeastRef.value) {
        yeast = yeastRef.value.replace(/ /g, "_");
        yeast = 'yeast=' + yeastRef.value;
      }
      if (abvGtRef.value) {
        abvGt = 'abv_gt=' + abvGtRef.value;
      }

      apiCall(text, period, yeast, abvGt, pageNumberRef.value).then(response => beersRef.value = response);
      console.log(beersRef.value);
      // console.log(searchText.value);
      saveSettings();
    };
    // const beforeApiCall = (text?: string, period: any)=>{
    //   apiCall(text, period).then(response=>beersRef.value=response);
    // };

    return {
      beersRef,
      monthRef,
      searchText,
      print,
      getData,
      yeastRef,
      abvGtRef,
      pageNumberRef,
      decreasePage,
      increasePage,
      showPopup,
      showPopupRef,
      onSearch,
      closePopUp,
      selectedBeerRef,
      clickCount
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.hello {
  // margin:50px

  margin-left: 25%;
  margin-right: 25%;
}

h3 {
  // margin: 40px 0 0 0;
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
.container{
  background-color:black;
  li {
  margin: 20px 0px;
  background-color: black;
  list-style-type: none;


  .list {
    display: flex;
    flex-direction: row;

    .details {
      margin-top: 10px;
      position: relative;
    }
  }
  
}

}
</style>
