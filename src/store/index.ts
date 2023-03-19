import { createStore } from "vuex";
import Filters from "@/model/filters";
export default createStore({
  state: {
    filters:{} as Filters,
    pageNumber: 1,
    clickCount:0
  },
  mutations: {
    setFilters(state,value){
      state.filters=value;
    },
    setPageNumber(state,value){
      state.pageNumber=value;
    },
    setClickCount(state,value){
      state.clickCount=value;
    }
  },
  actions: {
    setFilters (context, value) {
      context.commit('setFilters', value);
    },
    setPageNumber (context, value) {
      context.commit('setPageNumber', value);
    },
    setClickCount (context, value) {
      context.commit('setClickCount', value);
    }
  },
  modules: {}
});
