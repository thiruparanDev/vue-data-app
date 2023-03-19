<template>
    <div>
        <div><input v-model="filtersInfoRef.searchText" placeholder="Enter beer name">
        </div>
        <div class="date">
            <span>Enter brewed date before: </span><input v-model="filtersInfoRef.monthRef" placeholder="mm">-<input
                v-model="filtersInfoRef.yearRef" placeholder="yyyy">
        </div>
        <div>
            <input v-model="filtersInfoRef.yeastRef" placeholder="yeast name ">
        </div>
        <div>
            <input v-model="filtersInfoRef.abvGtRef" placeholder="alcohol percentage greater than ">
        </div>
        <div>
            <input v-model="filtersInfoRef.abvLtRef" placeholder="alcohol percentage less than ">
        </div>
        <button @click="onSearchClick">Search</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import Filters from "@/model/filters";
export default defineComponent({
    name: "Search",
    props:{
        onSearch:Function
    },
    components: {
    },
    setup(props) {
        const filtersInfoRef = ref({} as Filters);
        const onSearchClick=()=>{
            if (props.onSearch){
                props.onSearch(filtersInfoRef.value);
            }
        };
        return {
            filtersInfoRef,
            onSearchClick
        };
    }
});
</script>

<style lang="scss" scoped>
input {
  width: 300px;
}
.date {
    input {
        width: 50px;
    }
}
</style>