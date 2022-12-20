<template>

    <div>
 
     <table class="table table-bordered">
     <thead>
       <tr>
         <th scope="col">#</th>
         <th scope="col">LUNES</th>
         <th scope="col">MARTES</th>
         <th scope="col">MIERCOLES</th>
         <th scope="col">JUEVES</th>
         <th scope="col">VIERNES</th>
         <th scope="col">SABADO</th>
         <th scope="col">DOMINGO</th>
       </tr>
     </thead> 
     <tbody>
 
       <tr v-for="(item1,index1) in  horas" :key="index1">
         <th scope="row">{{item1}}</th>
         <td v-for="(item,index) in dias" :key="index">{{checkdata(item,item1)}}</td>
       </tr>
       
     </tbody>
 </table>
    </div>
 </template>
 <script>
     export default{
         name:'TableView',
         data(){
             return{
                 dias:['lunes','martes','miercoles','jueves','viernes','sabado','domingo'],
                 horas:['6-8','8-10','10-12','12-14','14-16','16-18','18-20','20-22']
             }
         },
         methods:{
             checkdata(x,y){
                 let contador=0;
                 let nombre="";
                 this.$store.state.materias.forEach(ele => {
                     if(x==ele.dia && y==ele.hora){
                         contador++;
                         nombre=ele.nombre
                     }
                 })
                 if(contador>0){
                     return nombre
                 }
 
 
             }
     }
 }
 </script>