import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehiculoModel } from 'src/app/models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  getVehiculo() {
    return this.http.get('http://localhost:5000/vehiculo');
  }

  postVehiculo(vehiculoRegister: VehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", vehiculoRegister);

    return this.http.post('http://localhost:5000/vehiculo', vehiculoRegister)
    
  }
}
