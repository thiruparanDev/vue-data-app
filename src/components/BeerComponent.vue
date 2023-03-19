<template>
  <h1>Welcome to Beer Selection</h1>
  <div class="popUpBackround" v-if="showPopupRef"></div>
  <SearchComponent :onSearch="onSearch" :filtersRef="filtersRef"/>
  <PopUp v-if="showPopupRef" :closePopUp="closePopUp" :selectedBeer="selectedBeerRef" />
  <BodyComponent :beersRef="beersRef" :showPopup="showPopup" />
  <FooterComponent :pageNumberRef="pageNumberRef" :decreasePage="decreasePage" :increasePage="increasePage"
    :clickCount="clickCount" />
    <!-- <input v-model="filtersRef.searchText" placeholder="yeast name "> -->
</template>

<script  lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Ref } from 'vue';
import { apiCall } from '@/services/BeerService';
import PopUp from "./PopUp.vue";
import Filters from "@/model/filters";
import SearchComponent from "./SearchComponent.vue";
import BodyComponent from "./BodyComponent.vue";
import FooterComponent from "./FooterComponent.vue";
import store from '@/store';
export default defineComponent({
  name: "Beer",
  props: {
    msg: String
  },
  components: {
    PopUp,
    SearchComponent,
    BodyComponent,
    FooterComponent
  },
  setup() {
    const filtersRef = ref({} as Filters);
    const beersRef: any = ref([]);
    const pageNumberRef: Ref<number> = ref(1);
    const showPopupRef: Ref<boolean> = ref(false);
    const selectedBeerRef: Ref<string> = ref("");
    const clickCount: Ref<number> = ref(0);
    onMounted(async () => {
      let savedItem = localStorage.getItem('savedItem');
      if (savedItem !== null) {
        const savedItem1 = JSON.parse(savedItem);
        // store.dispatch('setFiltersRef',savedItem1.filtersRef);
        filtersRef.value = savedItem1.filtersRef;
        pageNumberRef.value = savedItem1.pageNumberRef;
        clickCount.value = savedItem1.clickCount;
      }
      await getData();
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
    const increasePage = async () => {
      if (beersRef.value.length === 20) {
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

    const onSearch = async (value: Filters) => {
      filtersRef.value = JSON.parse(JSON.stringify(value));
      pageNumberRef.value = 1;
      await getData();
    };
    const saveSettings = () => {
      const saved = { filtersRef: filtersRef.value, pageNumberRef: pageNumberRef.value, clickCount: clickCount.value };
      localStorage.setItem('savedItem', JSON.stringify(saved));
    };


    const getData = async () => {
      let text = "";
      let period = "";
      let yeast = "";
      let abvGt = "";
      let abvLt = "";
      let fetch = true;
      if (filtersRef.value.searchText) {
        text = filtersRef.value.searchText.replace(/ /g, "_");
        text = 'beer_name=' + text;
      }
      if (filtersRef.value.monthRef && !filtersRef.value.yearRef) {
        alert("enter year");
        fetch = false;
      }
      if (!filtersRef.value.monthRef && filtersRef.value.yearRef) {
        alert("enter month");
        fetch = false;
      }
      if (filtersRef.value.monthRef && filtersRef.value.yearRef) {
        if (isNaN(filtersRef.value.monthRef) || isNaN(filtersRef.value.yearRef) || filtersRef.value.yearRef < 1900 || filtersRef.value.yearRef > 2023 || filtersRef.value.monthRef < 1 || filtersRef.value.monthRef > 12 || filtersRef.value.monthRef.toString().length > 2) {
          alert("Enter valid year and month");
          fetch = false;
        }
        else {
          period = `${filtersRef.value.monthRef}-${filtersRef.value.yearRef}`;
          period = 'brewed_before=' + period;
        }
      }
      if (filtersRef.value.yeastRef) {
        yeast = filtersRef.value.yeastRef.replace(/ /g, "_");
        yeast = 'yeast=' + filtersRef.value.yeastRef;
      }
      if (filtersRef.value.abvGtRef) {
        if (isNaN(filtersRef.value.abvGtRef)) {
          alert("please enter a number for Alcohol percentage");
          fetch = false;
        }
        else {
          abvGt = 'abv_gt=' + filtersRef.value.abvGtRef;
        }
      }
      if (filtersRef.value.abvLtRef) {
        if (isNaN(filtersRef.value.abvLtRef)) {
          alert("please enter a number for Alcohol percentage");
          fetch = false;
        }
        else {
          abvLt = 'abv_lt=' + filtersRef.value.abvLtRef;
        }
      }
      if (fetch) {
        await apiCall(text, period, yeast, abvGt, abvLt, pageNumberRef.value).then(response => beersRef.value = response);
        saveSettings();
      }

    };

    return {
      beersRef,
      print,
      getData,
      pageNumberRef,
      decreasePage,
      increasePage,
      showPopup,
      showPopupRef,
      onSearch,
      closePopUp,
      selectedBeerRef,
      clickCount,
      filtersRef
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
.date {
  input {
    width: 50px;
  }
}
h3 {
  min-width: 10px;

}

</style>
