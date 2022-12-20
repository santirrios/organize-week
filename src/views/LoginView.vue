<template>
    <div class="bg-dark">
        <form v-on:submit.prevent="login">
            <h1 class="text-white text-center py-4">Iniciar sesion</h1>

            <label class="text-white text-center d-block" for="email">Correo</label>
            <input class="d-block m-auto" type="email" name="email" v-model="email" required>

            <label class="text-white text-center d-block" for="password">Contraseña</label>
            <input class="d-block m-auto" type="password" name="password" v-model="password" required>

            <button class="d-block btn btn-primary mt-3 mx-auto">Iniciar sesion</button>
            <label class="text-white mx-auto text-center">{{ error }}</label>
        </form>
        <button v-on:click.prevent="loginGoogle" class="d-block btn btn-primary mx-auto mb-2">Google</button>
        
    </div>
</template>
<script>
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
    name: 'LogInComp',
    data() {
        return {
            error: "",
            email: "",
            password: "",
        }
    },
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
                console.log(auth.currentUser)
                this.$store.state.user = auth.currentUser
                this.$store.dispatch('reloadDataAction')
                this.$router.push('/')
            })
                .catch(err => {
                    this.error = err
                })
        },
        loginGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(() => {
                console.log(auth.currentUser)
                this.$store.state.user = auth.currentUser;
                this.$store.dispatch('reloadDataAction')
                this.$router.push('/')
            })
            .catch((err)=>{
                this.error=err
            })

        }
    }
}
</script>