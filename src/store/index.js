import Vue from 'vue'
import Vuex from 'vuex'
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",
    materias: [],
    records: [],
    subjectsSnapshot: "",
    recordsSnapshot: ""
  },
  getters: {
  },
  mutations: {
    reloadData(state) {
      const q1 = query(collection(db, 'users', state.user.uid, 'materias'));
      state.subjectsSnapshot = onSnapshot(q1, (querySnapshot) => {
        console.log("SNAPHOT UNSUSCRIBE", state.subjectsSnapshot)
        state.materias = [];
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


      const q2 = query(collection(db, 'users', state.user.uid, 'records'));
      state.recordsSnapshot = onSnapshot(q2, (querySnapshot) => {
        state.records = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data().date.toDate())
          state.records.push(
            {
              id: doc.id,
              nombre: doc.data().nombre,
              dia: doc.data().dia,
              hora: doc.data().hora,
              estado: doc.data().estado,
              date: doc.data().date.toDate()
            }

          );
        });
      });
      state.records.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        }
        if (a.date > b.date) {
          return -1
        }
        return 0
      })
    },
    unsuscribe(state) {
      state.subjectsSnapshot()
      state.recordsSnapshot()
      console.log("unsuscribed")
    }
  },
  actions: {
    reloadDataAction(context) {
      context.commit('reloadData')
    },
    unsuscribeAction(context) {
      context.commit('unsuscribe')
    }
  },
  modules: {
  }
})
