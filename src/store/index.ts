import { createStore } from "vuex";
import Filters from "@/model/filters";
export default createStore({
  state: {
    filtersRef:{} as Filters
  },
  mutations: {
    setFiltersRef(state,value){
      state.filtersRef=value;
    }
  },
  actions: {
    setFiltersRef (context, value) {
      context.commit('setFiltersRef', value);
    }
  },
  modules: {}
});
