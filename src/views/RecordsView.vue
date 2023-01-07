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
                    <strong> buscar</strong> <br><input type="text" v-model="searched">
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
        <h3>PAGINA: {{ page }}</h3>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
            listSearch: [],
            orderDate: true,
            searched: "",
            startList: 0,
            endList: 5,
            page: 1
        }
    },
    methods: {
        ordenarPorFechaCambiar() {
            if (this.orderDate === true) {
                this.orderDate = !this.orderDate
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
                    this.list = this.$store.state.records.slice(this.startList, this.endList)
                } else {
                    this.list = this.$store.state.records
                }
            } else {
                this.orderDate = !this.orderDate
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
                    this.list = this.$store.state.records.slice(this.startList, this.endList)
                } else {
                    this.list = this.$store.state.records
                }
            }
        },
        nextPage() {
            if (this.$store.state.records.length >= 5) {
                if (this.$store.state.records.length > this.startList + this.list.length) {
                    this.startList += 5
                    this.endList += 5
                    console.log(this.startList)
                    console.log(this.endList)
                    this.list = this.$store.state.records.slice(this.startList, this.endList)
                    this.page++
                }
            } else {
                this.list = this.$store.state.records
            }
        },
        beforePage() {
            if (this.$store.state.records.length >= 5) {
                if (this.startList >= 5) {
                    this.startList -= 5
                    this.endList -= 5
                    console.log(this.startList)
                    console.log(this.endList)
                    this.list = this.$store.state.records.slice(this.startList, this.endList)
                    this.page--
                }
            } else {
                this.list = this.$store.state.records
            }
        }
    },
    computed: {
        verificarNombre() {
            if (this.searched !== "") {
                let array = []
                this.$store.state.records.forEach(item => {
                    if (item.nombre.indexOf(this.searched) !== -1) {
                        array.push(item)
                    }
                })
                return array
            } else {
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
            this.list = this.$store.state.records.slice(this.startList, this.endList)
        } else {
            this.list = this.$store.state.records
        }
    }
}
</script>