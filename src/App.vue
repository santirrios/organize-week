<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Organize week</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="this.$store.state.user" to="/">Home</b-nav-item>
            <b-nav-item v-if="this.$store.state.user" to="/records">Registro</b-nav-item>
            <b-nav-item v-if="!this.$store.state.user" to="/logup">Registrarse</b-nav-item>
            <b-nav-item v-if="!this.$store.state.user" to="/login">Iniciar sesion</b-nav-item>
            <b-nav-item v-on:click.prevent="logout" v-if="this.$store.state.user" href="login">Cerrar
              sesion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
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
        this.$store.dispatch('unsuscribeAction')
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