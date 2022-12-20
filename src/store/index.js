import Vue from 'vue'
import Vuex from 'vuex'
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",
    materias: []
  },
  getters: {
  },
  mutations: {
    reloadData(state) {
      const q = query(collection(db, state.user.uid));
      onSnapshot(q, (querySnapshot) => {
        state.materias=[];
        querySnapshot.forEach((doc) => {
          console.log("nuevo")
          state.materias.push(
            {
              id: doc.id,
              nombre: doc.data().nombre,
              dia: doc.data().dia,
              hora: doc.data().hora
            }
          );
        });
      });

      /* let obtenerProductos =(callback)=> onSnapshot(collection(db,state.user.uid),callback);
      obtenerProductos(querySnapshot=>{
        state.materias=[];
        querySnapshot.forEach(doc => {
          console.log("viejo")
          let obj = {
            id:doc.id,
            nombre:doc.data().nombre,
            dia:doc.data().dia,
            hora:doc.data().hora
          }
          state.materias.push(obj)
          
        });
      }) */
    }
  },
  actions: {
    reloadDataAction(context) {
      context.commit('reloadData')
    }
  },
  modules: {
  }
})
