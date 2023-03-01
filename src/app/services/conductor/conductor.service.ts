import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConductorModel } from 'src/app/models/conductor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getCoductor() {
    return this.http.get(this.WEB_URL + '/conductor');
  }

  postConductor(conductorRegister: ConductorModel) {
    console.log("LLEGA INFO DEL FORMULARIO", conductorRegister);
    
    return this.http.post(this.WEB_URL + '/conductor', conductorRegister)
  }

  getConductorId(id: string) {
    return this.http.get(this.WEB_URL + '/conductor' + id)
  }

  login(cedula: number) {
    return this.http.post(this.WEB_URL + '/conductor/', cedula);
  }

  getUserFind(cedula: number) {
    return this.http.get(this.WEB_URL + '/conductor/' + cedula)
  }

}


