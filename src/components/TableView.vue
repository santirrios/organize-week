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
            const fechas=[
                ['6-8','8-10','10-12','12-14','14-16','16-18','18-20','20-22'],
                ['lunes','martes','miercoles','jueves','viernes','sabado','domingo']
            ]
            let obj2={}
            const array = []
            fechas[0].forEach(hora=>{
                fechas[1].forEach(dia=>{
                    let obj1={hora,[dia]:this.checkdata(dia,hora)}
                    obj2= Object.assign(obj2,obj1)
                })
                array.push(obj2)
                obj2={}
            })
            return array
        }
    }
}
</script>