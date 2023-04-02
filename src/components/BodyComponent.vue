<template>
  <a-list size="large" bordered :data-source="beersRef"  >
    <template #renderItem="{ item }">
      <a-list-item @click="showPopup(item)" :key="item.id" >{{ item.name }}</a-list-item>
    </template>
  </a-list>
  </template>
  
  <script lang="ts">
  import { defineComponent,PropType,ref, onMounted } from "vue";
  
  export default defineComponent({
    name: "Body",
    components: {
    },
    props:{
      beersRef:Object as PropType<any>,
      showPopup:Function
    },
    setup(props) {
      return{
      };
    }
  });
  </script>

<style lang="scss" scoped>
li {
  // margin: 20px 0px;
  // background-color: lightblue;
  list-style-type: none;

  &:hover {
    background-color: rgb(226, 241, 250);
    cursor: pointer;
    
  }
  .ant-list-item{
    display: flex;
    align-content: center;
    text-align: center;
    // &:hover{
    //   background-color: blue;
    // }
  }

}
.ant-list.ant-list-lg.ant-list-split.ant-list-bordered{
  // background-color: blue;
  margin: 2%;
  margin-left: 25%;
  margin-right: 25%;
  background-color: rgb(250, 248, 248);
}

  @media only screen and (max-width: 900px) {
    .ant-list.ant-list-lg.ant-list-split.ant-list-bordered{
  // background-color: blue;
  margin: 2%;
  margin-left: 15%;
  margin-right: 15%;
  // background-color: rgb(250, 248, 248);
}
  }
  @media only screen and (max-width: 576px) {
    .ant-list.ant-list-lg.ant-list-split.ant-list-bordered{
  // background-color: blue;
  margin: 2%;
  margin-left: 0%;
  margin-right: 0%;
  // background-color: rgb(250, 248, 248);
}
  }
</style>