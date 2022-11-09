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

  getCtrlPlaca (placa: string) {
    return this.http.get(`http://localhost:3000/control/placa/${placa}`)
  }

  postControlVehiculo(controlVehiculoRegister: ControlVehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", controlVehiculoRegister);

    return this.http.post('http://localhost:3000/control', controlVehiculoRegister)

  }

  updateNetoTotalVehiculo(idVehiculo: string, netoTotal: number) {
    console.log("LLEGA netoTotal a actualizar", netoTotal);
    const sumaNetos = {
      'netoTotal': netoTotal
    }

    return this.http.put('http://localhost:3000/vehiculo/netos/' + idVehiculo, sumaNetos)
    // return this.http.post('http://localhost:3000/control', controlVehiculoRegister)
  }
}
