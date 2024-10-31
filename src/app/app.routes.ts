import { Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';

export const routes: Routes = [
    {
    path: '',
    component:DoctorComponent,
    title: 'Doctor'
},
{
    path: 'doctor-form/:id',
        component:DoctorComponent,
        title: 'Lista de Doctores'

},
{
    path: '**', redirectTo:'', pathMatch:'full'
}];

