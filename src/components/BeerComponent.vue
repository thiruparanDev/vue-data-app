<template>
  <h1>Welcome to Beer Selection</h1>
  <div class="popUpBackround" v-if="showPopupRef"></div>
  <SearchComponent :onSearch="onSearch" :filtersRef="filtersRef"/>
  <PopUp v-if="showPopupRef" :closePopUp="closePopUp" :selectedBeer="selectedBeerRef" />
  <BodyComponent :beersRef="beersRef" :showPopup="showPopup" />
  <FooterComponent :beerLength="beersRef.length"
    :clickCount="clickCount" :getData="getData" :pageNumber="pageNumber"/>
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
    const showPopupRef: Ref<boolean> = ref(false);
    const selectedBeerRef: Ref<string> = ref("");
    const clickCount: Ref<number> = ref(0);
    const pageNumber: Ref<number> = ref(1);
    onMounted(async () => {
      filtersRef.value=store.state.filters;
      clickCount.value=store.state.clickCount;
      pageNumber.value=store.state.pageNumber;
      await getData(pageNumber.value);
    });
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
      pageNumber.value=1;
      localStorage.setItem('pageNumber', JSON.stringify(pageNumber.value));
      await getData();
    };
    const saveSettings = () => {
      localStorage.setItem('filters', JSON.stringify(filtersRef.value));
      localStorage.setItem('clickCount',JSON.stringify(clickCount.value));
    };


    const getData = async (page:number=pageNumber.value) => {
      pageNumber.value=page;
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
        await apiCall(text, period, yeast, abvGt, abvLt, pageNumber.value).then(response => beersRef.value = response);
        saveSettings();
      }

    };

    return {
      beersRef,
      print,
      getData,
      showPopup,
      showPopupRef,
      onSearch,
      closePopUp,
      selectedBeerRef,
      clickCount,
      filtersRef,
      pageNumber
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
