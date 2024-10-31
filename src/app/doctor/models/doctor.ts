export class Doctor {
    id:number;
    nombre:string;
    apellidos:string;

    contructor(id:number=0, nombre:string ='', apellidos:string=''){
        this.id=id;
        this.nombre=nombre;
        this.apellidos=apellidos;
    }
}
