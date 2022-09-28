import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RodamientoModel } from 'src/app/models/rodamiento.model';
import { identifierName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RodamientoService {

  constructor(private http: HttpClient) { }

  getRodamiento() {
    return this.http.get('http://localhost:5000/rodamiento');
  }

  postRodamiento(rodamientoRegister: RodamientoModel) {
    return this.http.post('http://localhost:5000/rodamiento', rodamientoRegister)
  }

  getRodamientoId(id: string) {
    return this.http.get('http://localhost:5000/rodamiento' + id)
  }


}
