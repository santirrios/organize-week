<template>
    <div v-if="(this.$store.state.user)">
      <div class="row">
        <div class="col">
          <TableView></TableView>
        </div>
        <div class="col">
          <ListData></ListData>
        </div>
      </div>
    </div>
    
  </template>
  <script>
  import ListData from '../components/ListData.vue'
  import TableView from '../components/TableView.vue'
    export default{
      name:'HomeView',
      components:{
        ListData,
        TableView
      }
    }
  </script>