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
            return [
                { hora: '6-8', lunes: this.checkdata('lunes', '6-8'), martes: this.checkdata('martes', '6-8'), miercoles: this.checkdata('miercoles', '6-8'), jueves: this.checkdata('jueves', '6-8'), viernes: this.checkdata('viernes', '6-8'), sabado: this.checkdata('sabado', '6-8'), domingo: this.checkdata('domingo', '6-8') },
                { hora: '8-10', lunes: this.checkdata('lunes', '8-10'), martes: this.checkdata('martes', '8-10'), miercoles: this.checkdata('miercoles', '8-10'), jueves: this.checkdata('jueves', '8-10'), viernes: this.checkdata('viernes', '8-10'), sabado: this.checkdata('sabado', '8-10'), domingo: this.checkdata('domingo', '8-10') },
                { hora: '10-12', lunes: this.checkdata('lunes', '10-12'), martes: this.checkdata('martes', '10-12'), miercoles: this.checkdata('miercoles', '10-12'), jueves: this.checkdata('jueves', '10-12'), viernes: this.checkdata('viernes', '10-12'), sabado: this.checkdata('sabado', '10-12'), domingo: this.checkdata('domingo', '10-12') },
                { hora: '12-14', lunes: this.checkdata('lunes', '12-14'), martes: this.checkdata('martes', '12-14'), miercoles: this.checkdata('miercoles', '12-14'), jueves: this.checkdata('jueves', '12-14'), viernes: this.checkdata('viernes', '12-14'), sabado: this.checkdata('sabado', '12-14'), domingo: this.checkdata('domingo', '12-14') },
                { hora: '14-16', lunes: this.checkdata('lunes', '14-16'), martes: this.checkdata('martes', '14-16'), miercoles: this.checkdata('miercoles', '14-16'), jueves: this.checkdata('jueves', '14-16'), viernes: this.checkdata('viernes', '14-16'), sabado: this.checkdata('sabado', '14-16'), domingo: this.checkdata('domingo', '14-16') },
                { hora: '16-18', lunes: this.checkdata('lunes', '16-18'), martes: this.checkdata('martes', '16-18'), miercoles: this.checkdata('miercoles', '16-18'), jueves: this.checkdata('jueves', '16-18'), viernes: this.checkdata('viernes', '16-18'), sabado: this.checkdata('sabado', '16-18'), domingo: this.checkdata('domingo', '16-18')},
                { hora: '18-20', lunes: this.checkdata('lunes', '18-20'), martes: this.checkdata('martes', '18-20'), miercoles: this.checkdata('miercoles', '18-20'), jueves: this.checkdata('jueves', '18-20'), viernes: this.checkdata('viernes', '18-20'), sabado: this.checkdata('sabado', '18-20'), domingo: this.checkdata('domingo', '18-20') },
                { hora: '20-22', lunes: this.checkdata('lunes', '20-22'), martes: this.checkdata('martes', '20-22'), miercoles: this.checkdata('miercoles', '20-22'), jueves: this.checkdata('jueves', '20-22'), viernes: this.checkdata('viernes', '20-22'), sabado: this.checkdata('sabado', '20-22'), domingo: this.checkdata('domingo', '20-22') },
            ]
        }
    }
}
</script>