<template>
  <div id="app">
    <nav class="nav bg-dark">
      <router-link class="nav-link text-white" v-if="this.$store.state.user" to="/">Home</router-link>
      <router-link class="nav-link text-white" v-if="!this.$store.state.user" to="/logup">Registrarse</router-link>
      <router-link class="nav-link text-white" v-if="!this.$store.state.user" to="/login">Iniciar sesion</router-link>
      <a v-on:click.prevent="logout" class="nav-link text-white" v-if="this.$store.state.user" href="">Cerrar sesion</a>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { auth } from './firebase.js'

export default {
  name: 'App',
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.state.user = ""
        console.log("user signed out")
        this.$router.push('/login')
      })

    }
  }, mounted() {
    setTimeout(() => {
      console.log(auth.currentUser)
      this.$store.state.user = auth.currentUser
      if (this.$store.state.user) {
        this.$store.dispatch('reloadDataAction')
      }
    }, 500)
  }
}
</script>