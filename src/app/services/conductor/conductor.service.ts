import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConductorModel } from 'src/app/models/conductor.model';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http: HttpClient) { }

  getCoductor() {
    return this.http.get('http://localhost:3000/conductor');
  }

  postConductor(conductorRegister: ConductorModel) {
    console.log("LLEGA INFO DEL FORMULARIO", conductorRegister);
    
    return this.http.post('http://localhost:3000/conductor', conductorRegister)
  }

  getConductorId(id: string) {
    return this.http.get('http://localhost:3000/conductor' + id)
  }

  login(cedula: number) {
    return this.http.post('http://localhost:3000/conductor/', cedula);
  }

  getUserFind(cedula: number) {
    return this.http.get('http://localhost:3000/conductor/' + cedula)
  }

}


