import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehiculoModel } from 'src/app/models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  getVehiculo() {
    return this.http.get('http://54.164.205.82:3000/vehiculo');
  }

  getVehiculoID(id: string) {
    return this.http.get(`http://54.164.205.82:3000/vehiculo/${id}`);
  }

  postVehiculo(vehiculoRegister: VehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", vehiculoRegister);

    return this.http.post('http://54.164.205.82:3000/vehiculo', vehiculoRegister)
    
  }

  putRodamiento(id: string, rodamiento: object) {
    console.log("rodamiento", rodamiento)
    console.log("ID", id)
    return this.http.put('http://54.164.205.82:3000/vehiculo/rodamiento/' + id, rodamiento)
  }
}
