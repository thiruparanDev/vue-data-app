<template >
    <div class="popUp">
        <button @click="closePopUp">X</button>
    <div >
        <h3>{{selectedBeer?.name}}</h3>
        <div class="list">
        <div>
          <img :src="selectedBeer?.image_url" alt="not found" height="200">
        </div>
        <div class="details" >
        <div v-for="detail in details" :key="detail" class="detail">
           {{detail.name}} {{detail.value}}
        </div>
    </div>
      </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted } from "vue";
export default defineComponent({
    props:{
        closePopUp:Function,
        selectedBeer: Object
    }
    ,
    setup(props){
    // const details=[props.selectedBeer?.description,props.selectedBeer?.first_brewed,props.selectedBeer?.yeast,props.selectedBeer?.abv];
    const details=
    [{name:'',value:props.selectedBeer?.description},
    {name:'First brewed: ',value:props.selectedBeer?.first_brewed},
    {name:'Yeast: ',value:props.selectedBeer?.ingredients?.yeast},
    {name:'Alcohol percentatage: ',value:props.selectedBeer?.abv}
];

    const closePopUp1=()=>{
        
        console.log("hi");
    };
    const print =(detail: any)=>{
        console.log(props?.selectedBeer?.detail);
    };

    return{
    closePopUp1,
    details,
    print
    };
    }
});
</script>

<style 
lang="scss" scoped>
.popUp{
    .list {
    display: flex;
    flex-direction: row;

    .details {
      margin-top: 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      /* // top:50px;
      // background-color: blue; */
      .detail{
        padding-top: 10px;
      }
    }
  }
  /* display: flex;
  justify-content: center; */
  margin-left: 25%;
  margin-right: 25%;
  height: 400px;
  width:50%;
  /* position: absolute; */
    /* top: 100px; */
    background-color: lightblue;
    
    button{
        position: relative;
        left: 47%;
    }
}
</style>