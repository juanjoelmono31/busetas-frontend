import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlVehiculoModel } from 'src/app/models/control-vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class ControlVehiculoService {

  constructor(private http: HttpClient) { }

  getControlVehiculo() {
    return this.http.get('http://localhost:3000/control');
  }

  postControlVehiculo(controlVehiculoRegister: ControlVehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", controlVehiculoRegister);

    return this.http.post('http://localhost:3000/control', controlVehiculoRegister)
    
  }
}
