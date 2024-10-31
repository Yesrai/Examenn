import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
private apiUrl= 'http://localhost:8080/api/Doctor';
  constructor(private http:HttpClient) { }
  
  getDoctor():Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl);
  }
  getDoctorById(id:number):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${this.apiUrl}/${id}`);
  }
  createDoctor(Doctor: Doctor):Observable<Doctor[]>{
    return this.http.post<Doctor[]>(this.apiUrl, Doctor);
  }
  deleteDoctor(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateDoctor(Doctor:Doctor, id:number): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, Doctor);
  }
}