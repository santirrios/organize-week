<template>
    <div>
        <b-table striped hover :items="viewTable()"></b-table>
    </div>
</template>
<script>
export default {
    name: 'TableView',
    methods: {
        checkdata(x, y) {
            let contador = 0;
            let nombre = "";
            this.$store.state.materias.forEach(ele => {
                if (x == ele.dia && y == ele.hora) {
                    contador++;
                    nombre = ele.nombre
                }
            })
            if (contador > 0) {
                return nombre
            }else{
                return""
            }
        },
        viewTable(){
            const horas=['6-8','8-10','10-12','12-14','14-16','16-18','18-20','20-22']
            const array = []
            horas.forEach(hora=>{
                    let obj={hora:hora,lunes:this.checkdata('lunes',hora),martes:this.checkdata('martes',hora),miercoles:this.checkdata('miercoles',hora),jueves: this.checkdata('jueves', hora), viernes: this.checkdata('viernes', hora), sabado: this.checkdata('sabado', hora), domingo: this.checkdata('domingo', hora)}
                    array.push(obj)
            })
            return array
        }
    }
}
</script>