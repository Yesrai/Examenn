import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,FormsModule,ConfirmDialogModule,ToastModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 categorias:Doctor[]=[];
 titulo:string='';
 opc:string='';
 categoria= new Doctor();
 op = 0; 
 visible: boolean = false; 
 isDeleteInProgress: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private messageService: MessageService
  ){}

  ngOnInit():void{
    this.listarCategorias();
  }
  listarCategorias(){
    this.doctorService.getDoctor().subscribe((data)=>{
      this.doctor=data;
    });
  }
  hola(id:number){
    console.log('button clicked '+id);
  }
  showDialogCreate() {
    this.titulo="Crear Doctor"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number) {
    this.titulo="Editar Doctor"
    this.opc="Editar"; 
   this.doctorService.getDoctorById(id).subscribe((data)=>{
      this.categoria=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteDoctor(id: number) {
    this.isDeleteInProgress = true;
    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Doctor eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarDoctor();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría',
        });
      },
    });
  }
  listarDoctor() {
    throw new Error('Method not implemented.');
  }
  addDoctor():void{ 
    this.doctorService.createCategoria(this.categoria).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Doctor Registrado',
        });
        this.listarDoctor();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Agregar la categoría',
        });
      },
    });    
    this.visible = false;
  }
  editCategoria(){
    this.doctorService.updateCategoria(this.categoria,this.categoria.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Doctor Editado',
        });
        this.listarDoctor();
        console.log(this.doctor.id+' '+this.doctor.nombre+' '+this.doctor.apellidos);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la categoría',
        });
      },
    });    
    this.visible = false;
  }
  opcion():void{
    if(this.op==0){
      this.addDoctor();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editCategoria();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
    
  }
 limpiar(){
  this.titulo='';
  this.opc='';
  this.op = 0; 
  this.categoria.id=0;
  this.categoria.nombre='';
  this.categoria.estado='1';
 }
}
