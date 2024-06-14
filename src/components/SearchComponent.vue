<template>
    <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 6 }">
        <a-form-item label="Beer name"><a-input v-model:value="filtersInfoRef.searchText" placeholder="Enter beer name" />
        </a-form-item>
        <a-form-item  label="Brewed date <">
            <a-date-picker @change="datePick" v-model:value="monthYear" picker="month" />
        </a-form-item>
        <a-form-item label="Yeast name"><a-input v-model:value="filtersInfoRef.yeastRef" placeholder="yeast name" />
        </a-form-item>
        <a-form-item label="Alcohol % >"><a-input v-model:value="filtersInfoRef.abvGtRef" placeholder="alcohol percentage greater than" />
        </a-form-item>
        <a-form-item label="Alcohol % <"><a-input v-model:value="filtersInfoRef.abvLtRef" placeholder="alcohol percentage less than" />
        </a-form-item>
        <a-button @click="onSearchClick">Search</a-button>
    </a-form>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed, PropType, watch } from "vue";
import Filters from "@/model/filters";
import store from '@/store';
// import moment, { Moment } from 'moment';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
// import { STRING_UNARY_OPERATORS } from "@babel/types";
export default defineComponent({
    name: "Search",
    props: {
        onSearch: Function,
        filtersRef: Object as PropType<any>
    },
    components: {
    },
    setup(props) {
        const filtersInfoRef = ref({} as Filters);
        watch(() => props.filtersRef, (value) => filtersInfoRef.value = JSON.parse(JSON.stringify(value)));
        onMounted(() => {
            // filtersInfoRef.value = filter.value;
            // console.log( filtersInfoRef.value);
            if (store.state.filters.yearRef) {
                monthYear.value = dayjs(`02-${store.state.filters.monthRef}-${store.state.filters.yearRef}`, ["DD-MM-YYYY", "DD-M-YYYY"]);
                // monthYear.value=dayjs(`02-${filtersInfoRef.value.monthRef}-${filtersInfoRef.value.yearRef}`, ["DD-MM-YYYY","DD-M-YYYY"]);
            }
        });
        // const filter=computed(()=>JSON.parse(JSON.stringify(props.filtersRef)));
        const monthYear = ref<Dayjs>();
        const datePick = (val: Dayjs) => {
            filtersInfoRef.value.yearRef = val.year();
            filtersInfoRef.value.monthRef = val.month() + 1;
        };
        const onSearchClick = () => {
            // console.log(monthYear);
            if (props.onSearch) {
                props.onSearch(filtersInfoRef.value);
            }
        };
        return {
            filtersInfoRef,
            onSearchClick,
            datePick,
            monthYear
        };
    }
});
</script>

<style lang="scss" scoped>
// input {
//     width: 300px;
// }
.home{
    .ant-col{
        .ant-form-item-control-input{
            background-color: blue;
            // display: flex;
            flex: none;
        }
    
    }
}   
// .date {
//     input {
//         width: 50px;
//     }
// }
.ant-picker{
  width: 100%;
}
</style>