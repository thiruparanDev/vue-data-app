<template>
  <h1>Welcome to Beer Selection</h1>
  <div class="popUpBackround" v-if="showPopupRef"></div>
  <!-- <div :class="{container:showPopupRef}"> -->
  <div>
    <div><input v-model="searchText" placeholder="Enter beer name">
    </div>
    <div>
      <input v-model="monthRef" placeholder="Enter date (mm-yyyy) brewed before ">
    </div>
    <div>
      <input v-model="yeastRef" placeholder="yeast name ">
    </div>
    <div>
      <input v-model="abvGtRef" placeholder="alcohol percentage greater than ">
    </div>
    <div>
      <input v-model="abvLtRef" placeholder="alcohol percentage less than ">
    </div>
    <button @click="onSearch">Search</button>
  </div>
  <!-- {{searchText}} -->
  <PopUp v-if="showPopupRef" :closePopUp="closePopUp" :selectedBeer="selectedBeerRef" />
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
  <button @click="decreasePage">Previous</button>
  {{ pageNumberRef }}
  <button @click="increasePage">Next</button>
  <div>
    Click count: {{ clickCount }}
  </div>
  <!-- </div> -->
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
    const abvLtRef: any = ref();
    const pageNumberRef: any = ref(1);
    const showPopupRef: any = ref(false);
    const selectedBeerRef: any = ref("");
    const clickCount: any = ref(0);
    onMounted(async() => {
      let savedItem = localStorage.getItem('savedItem');
      if (savedItem !== null) {
        const savedItem1: Saved = JSON.parse(savedItem);
        // console.log(savedItem?.searchText);
        searchText.value = savedItem1?.searchText;
        monthRef.value = savedItem1.monthRef;
        yeastRef.value = savedItem1.yeastRef;
        abvGtRef.value = savedItem1.abvGtRef;
        abvLtRef.value = savedItem1.abvLtRef;
        pageNumberRef.value = savedItem1.pageNumberRef;
        // showPopupRef.value=savedItem1.showPopupRef;
        // selectedBeerRef.value=savedItem1.selectedBeerRef;
        clickCount.value = savedItem1.clickCount;

      }
      await getData();
      // apiCall().then(response => beersRef.value = response);
      // console.log(beersRef.value);
    });

    // const print=(e: any)=>{
    //   // console.log('gu')
    //   console.log(searchText.value);
    // };
    const decreasePage = async () => {
      if (pageNumberRef.value > 1) {
        pageNumberRef.value--;
        await getData();
      }
    };
    const increasePage = async() => {
      if (beersRef.value.length===20){
      pageNumberRef.value++;
      await getData();
      }
    };
    const showPopup = (beer: any) => {
      showPopupRef.value = true;
      selectedBeerRef.value = beer;
      clickCount.value++;
      saveSettings();
    };
    const closePopUp = () => {
      showPopupRef.value = false;
    };
    const onSearch = async () => {
      pageNumberRef.value = 1;
      await getData();
    };
    interface Saved {
      searchText: any;
      monthRef: any;
      yeastRef: any;
      abvGtRef: any;
      abvLtRef: any;
      pageNumberRef: any;
      // showPopupRef: any;
      // selectedBeerRef: any;
      clickCount: any
    }
    const saveSettings = () => {
      const saved: Saved = { searchText: searchText.value, monthRef: monthRef.value, yeastRef: yeastRef.value, abvGtRef: abvGtRef.value, abvLtRef: abvLtRef.value, pageNumberRef: pageNumberRef.value, clickCount: clickCount.value };
      localStorage.setItem('savedItem', JSON.stringify(saved));
    };
    const getData = async () => {
      let text = "";
      let period = "";
      let yeast = "";
      let abvGt = "";
      let abvLt = "";
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
        if (isNaN(abvGtRef.value)){
          alert("please enter a number for Alcohol percentage");
        }
        else{
        abvGt = 'abv_gt=' + abvGtRef.value;
      }
      }
      if (abvLtRef.value) {
        if (isNaN(abvLtRef.value)){
          alert("please enter a number for Alcohol percentage");
        }
        else{
        abvLt = 'abv_lt=' + abvLtRef.value;
      }
      }

      await apiCall(text, period, yeast, abvGt,abvLt, pageNumberRef.value).then(response => beersRef.value = response);
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
      abvLtRef,
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
.popUpBackround {
  background-color: black;
  position: fixed;
  width: 100%;
  height: 100%;
  // margin: 0;
  // padding: 0;
  top: 0;
  left: 0;
}
input{
  width: 300px;
}

.hello {
  // margin:50px
  background-color: rgb(226, 218, 218);
  min-width: 10px;
  margin-left: 25%;
  margin-right: 25%;
}

h3 {
  min-width: 10px;
  // background-color: blue;
  // max-width: 50%;
  // flex-wrap: wrap;
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

// .container{
//   background-color:black;
//   li {
//   margin: 20px 0px;
//   background-color: black;
//   list-style-type: none;


//   .list {
//     display: flex;
//     flex-direction: row;

//     .details {
//       margin-top: 10px;
//       position: relative;
//     }
//   }

// }

// }
</style>
