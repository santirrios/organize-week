<template>
    <div>
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, index) in this.$store.state.materias" :key="index">
                    <p>NOMBRE MATERIA: {{ item.nombre }} || HORARIO: {{ item.dia }} {{ item.hora }} </p> <button
                        class="btn btn-danger" v-on:click="borrar(item.id)">Borrar</button>
                </li>
            </ul>
            {{ this.$store.state.materias.count }}
        </div>
        <div class="row">
            <div class="col">
                <form v-on:submit.prevent="guardar">
                    <label class="d-block m-auto text-center" for="nombre">Nombre Materia</label>
                    <input class="d-block m-auto" type="text" placeholder="nombre" v-model="nombre" required>
                    <div class="row">
                        <div class="col">
                            <div class="float-right">
                                <label class="d-block text-center" for="dia">Dia</label>
                                <select class="d-block" name="dia" v-model="dia" required>
                                    <option value="lunes">lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="float-left">
                                <label class="d-block text-center" for="hora">Hora</label>
                                <select class="d-block " v-model="hora" name="hora" required>
                                    <option value="6-8">6-8</option>
                                    <option value="8-10">8-10</option>
                                    <option value="10-12">10-12</option>
                                    <option value="12-14">12-14</option>
                                    <option value="14-16">14-16</option>
                                    <option value="16-18">16-18</option>
                                    <option value="18-20">18-20</option>
                                    <option value="20-22">20-22</option>
                                </select>

                            </div>
                        </div>

                    </div>

                    <button class="btn btn-primary d-block mx-auto my-2">Guardar</button>
                    <label class="d-block text-center">{{ error }}</label>

                </form>
                <dialog id="modal">
                    <loading class="text-center" :active.sync="isLoading"/>
                </dialog>
                    
            </div>
        </div>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';

//localhost
/* import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"; 
const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);  */


import { functions } from '../firebase.js'


import { httpsCallable } from "firebase/functions";
export default {
    name: 'ListData',
    components: {
        Loading
    },
    data() {
        return {
            nombre: "",
            dia: "",
            hora: "",
            error: "",
            isLoading: false
        }
    },
    methods: {
        guardar() {
            const modal = document.querySelector("#modal");
            modal.showModal()
            this.isLoading = true;
            let contador = 0;
            this.$store.state.materias.forEach(element => {
                if (element.dia === this.dia && element.hora === this.hora) {
                    contador++;
                }
            });
            if (contador < 1) {
                const addData = httpsCallable(functions, 'addData');
                addData({
                    nombre: this.nombre,
                    dia: this.dia,
                    hora: this.hora
                })
                    .then((result) => {
                        console.log(result)
                        this.error = "";
                        this.isLoading = false;
                        modal.close()
                    });


                /* try {
                   fetch('/newData', {
                       objJson
                   }).then((response) => {
                       console.log(response)
                       this.error=""
                   })
               } catch (error) {
                   console.log("error")
               }  */



                /*  try {
                    fetch('/aplication/db', {
                        method:'post',
                        body:objJson
                    }).then((response) => {
                        console.log(response)
                        this.error=""
                    })
                } catch (error) {
                    console.log("error")
                }   */
            } else {
                this.error = "ya existe esta hora y dia"
            }



        },
        borrar(id) {
            const modal = document.querySelector("#modal");
            modal.showModal()
            this.isLoading = true;
            const deleteData = httpsCallable(functions, 'deleteData');
            deleteData({
                id
            })
                .then((result) => {
                    console.log(result)
                    this.isLoading = false;
                    modal.close()
                });
            /*  try {
                 fetch('/aplication/dbborrar', {
                     method: 'delete',
                     body: objJson
                 }).then((response) => {
                     console.log(response)
                 })
             } catch (err) {
                 console.log(err)
             } */
        }
    }
}
</script>
<style>
  #modal{
    border: 0;
  }
</style>