<template>
    <div>
        <h2 class="text-center">Registro de todos los movimientos</h2>
        <h3 class="ml-5">Ordenar por</h3>
        <div class="row">
            <div class="col">
                <div class="ml-5 my-auto">
                    <button class="btn btn-primary" v-on:click.prevent="ordenarPorFechaCambiar()">FECHA</button>
                </div>
            </div>
            <div class="col">
                <div class="float-right mt-auto mr-5">
                    <strong> buscar</strong> <br><input type="text" v-model="busqueda">
                </div>
            </div>
        </div>
        <b-list-group>
            <b-list-group-item>
                <p> NOMBRE <strong>||</strong> HORARIO <strong>||</strong> FECHA <strong>||</strong> ACCION </p>
            </b-list-group-item>
            <b-list-group-item v-for="(record, index) in this.verificarNombre" :key="index">
                <p> {{ record.nombre }} <strong>||</strong> {{ record.dia }} {{ record.hora }} <strong>||</strong>
                    {{ record.date }} <strong>||</strong> {{ record.estado }} </p>
            </b-list-group-item>
        </b-list-group>

        <button class="btn btn-secondary d-inline ml-1" v-on:click.prevent="beforePage()">Previous page</button>
        <button class="btn btn-primary d-inline ml-1" v-on:click.prevent="nextPage()">Next page</button>
        <h3>PAGINA: {{ pagina }}</h3>


    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
            listSearch: [],
            tipoOrdenFecha: true,
            busqueda: "",
            listado: 0,
            listadoDespues: 5,
            pagina:1
        }
    },
    methods: {
        ordenarPorFechaCambiar() {
            if (this.tipoOrdenFecha === true) {
                this.tipoOrdenFecha = !this.tipoOrdenFecha
                this.$store.state.records.sort((a, b) => {
                    if (a.date < b.date) {
                        return -1
                    }
                    if (a.date > b.date) {
                        return 1
                    }
                    return 0
                })
                if (this.$store.state.records.length >= 5) {
                    this.list = this.$store.state.records.slice(this.listado, this.listadoDespues)
                } else {
                    this.list = this.$store.state.records
                }
            } else {
                this.tipoOrdenFecha = !this.tipoOrdenFecha
                this.$store.state.records.sort((a, b) => {
                    if (a.date < b.date) {
                        return 1
                    }
                    if (a.date > b.date) {
                        return -1
                    }
                    return 0
                })
                if (this.$store.state.records.length >= 5) {
                    this.list = this.$store.state.records.slice(this.listado, this.listadoDespues)
                } else {
                    this.list = this.$store.state.records
                }
            }
        },
        nextPage() {
            if (this.$store.state.records.length >= 5) {
                if (this.$store.state.records.length > this.listado+this.list.length) {
                    this.listado += 5
                    this.listadoDespues += 5
                    console.log(this.listado)
                    console.log(this.listadoDespues)
                    this.list = this.$store.state.records.slice(this.listado, this.listadoDespues)
                    this.pagina++
                }
            } else {
                this.list = this.$store.state.records
            }
        },
        beforePage() {
            if (this.$store.state.records.length >= 5) {
                if (this.listado >= 5) {
                    this.listado -= 5
                    this.listadoDespues -= 5
                    console.log(this.listado)
                    console.log(this.listadoDespues)
                    this.list = this.$store.state.records.slice(this.listado, this.listadoDespues)
                    this.pagina--
                }
            } else {
                this.list = this.$store.state.records
            }
        }
    },
    computed: {
        verificarNombre() {
            if (this.busqueda !== "") {
                let array = []
                this.$store.state.records.forEach(item => {
                    if (item.nombre.indexOf(this.busqueda) !== -1) {
                        array.push(item)
                    }
                })
                return array
            }else{
                return this.list
            }
        }
    },
    mounted() {
        this.$store.state.records.sort((a, b) => {
            if (a.date < b.date) {
                return 1
            }
            if (a.date > b.date) {
                return -1
            }
            return 0
        })
        if (this.$store.state.records.length >= 5) {
            this.list = this.$store.state.records.slice(this.listado, this.listadoDespues)
        } else {
            this.list = this.$store.state.records
        }
    }
}
</script>