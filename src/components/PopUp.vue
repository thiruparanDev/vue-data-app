<template >
  <a-modal :visible="visible" class="popUp" :footer="null" @cancel="closePopUp" :width="'800px'">
    <template #title>
      <div style=" text-align: center; ">{{ selectedBeer?.name }}</div>
    </template>
    <a-row>
      <a-col :span="5">
          <img :src="selectedBeer?.image_url" alt="Image not found" height="200" >
      </a-col>
      <a-col :span="19">
        <a-list size="large" bordered :data-source="detailsRef">
    <template #renderItem="{ item }">
      <a-list-item :key="item.id"> <span style="font-weight: bold">{{ item.name }}</span>{{ item.value }}</a-list-item>
    </template>
  </a-list>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, PropType } from "vue";
export default defineComponent({
  props: {
    closePopUp: Function,
    selectedBeer: Object as PropType<any>,
    visible: Boolean
  }
  ,
  setup(props) {
    const detailsRef = computed(() => {
      return ([{ name: '', value: props.selectedBeer?.description },
      { name: 'First brewed: ', value: props.selectedBeer?.first_brewed },
      { name: 'Yeast: ', value: props.selectedBeer?.ingredients?.yeast },
      { name: 'Alcohol percentage: ', value: props.selectedBeer?.abv }
      ]);
    }
    );
    // const print =(detail: any)=>{
    //     console.log(props?.selectedBeer?.detail);
    // };

    return {
      detailsRef
      // ,
      // print
    };
  }
});
</script>

<style 
lang="scss" scoped>
ant-modal{

  .popUp{
    .ant-modal-content{
        .ant-modal-header{
        /* color: blue; */
        background-color: blue;
      }
    }
  }
}
.popUp {
  position: fixed;

  .list {
    display: flex;
    flex-direction: row;

    .details {
      margin-top: 10px;

      display: flex;
      flex-direction: column;

      /* // top:50px;
      // background-color: blue; */
      .detail {
        padding-top: 10px;
      }
    }
  }

  /* display: flex;
  justify-content: center; */
  /* margin-left: 25%;
  margin-right: 25%;
  height: 400px;
  width:50%;
  top: 25%;
  bottom: 25%; */
  /* position: absolute; */
  /* top: 100px; */
  /* background-color: lightblue; */

  button {
    position: relative;
    left: 48.5%;
  }
  .ant-col.ant-col-5{
    background-color: rgb(243, 238, 238);
    /* background-color: blue; */
      display: flex;
      align-items: center;
      justify-content: center;
  }
 
  
}

.ant-modal-root{
  /* .ant-modal-mask{ */

  }
/* } */

    </style>