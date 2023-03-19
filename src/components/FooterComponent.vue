<template>
  <button @click="decreasePage">Previous</button>
  {{ pageNumberRef }}
  <button @click="increasePage">Next</button>
  <div>
    Click count: {{ clickCount }}
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, Ref,onMounted,watch} from "vue";
import store from '@/store';
export default defineComponent({
  name: "Footer",
  props: {
    clickCount: Number,
    beerLength: Number,
    getData: Function,
    pageNumber:Number
  },
  components: {
  },
  setup(props) {
    watch(()=>props.pageNumber,(value)=>{
      if (value){
      pageNumberRef.value=value;
    }
  });
    const pageNumberRef: Ref<number> = ref(1);
    const decreasePage = async () => {
      if (pageNumberRef.value > 1) {
        pageNumberRef.value--;
        if (props.getData) {
          await props.getData(pageNumberRef.value);
          localStorage.setItem('pageNumber', JSON.stringify(pageNumberRef.value));
        }
      }
    };
    const increasePage = async () => {
      if (props.beerLength === 20) {
        pageNumberRef.value++;
        if (props.getData) {
          await props.getData(pageNumberRef.value);
          localStorage.setItem('pageNumber', JSON.stringify(pageNumberRef.value));
        }
      }
    };
    return {
      decreasePage,
      increasePage,
      pageNumberRef

    };
  }
});
</script>

<style lang="scss" scoped></style>