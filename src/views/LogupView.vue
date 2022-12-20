<template>
    <div class="bg-dark">
        <form v-on:submit.prevent="register">
            <h1 class="text-white text-center py-4">Registrarse</h1>

            <label  class="text-white text-center d-block" for="email">Correo</label>
            <input class="d-block m-auto" type="email" name="email" v-model="email" required>

            <label  class="text-white text-center d-block" for="password">Contraseña</label>
            <input class="d-block m-auto" type="password" name="password" v-model="password" required>

            <button class="d-block btn btn-primary my-3 mx-auto">Registrarse</button>
            <label class="text-white mx-auto text-center">{{error}}</label>
        </form>
    </div>
</template>
<script>
import {auth} from '../firebase.js'
import { createUserWithEmailAndPassword } from "firebase/auth";
    export default{
        name:'LogUpComp',
        data(){
            return{
                error:"",
                email:"",
                password:"",
            }
        },
        methods:{
            register(){
                createUserWithEmailAndPassword(auth,this.email,this.password).then(()=>{
                    this.$store.state.user =auth.currentUser
                    this.$store.dispatch('reloadDataAction')
                    this.$router.push('/')
                })
                .catch(err=>{
                    this.error=err
                })
            }
        }
    }
</script>