import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlVehiculoModel } from 'src/app/models/control-vehiculo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlVehiculoService {

  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getControlVehiculo() {
    return this.http.get(this.WEB_URL + '/control');
  }

  getCtrlPlaca (placa: string) {
    return this.http.get(this.WEB_URL + `/control/placa/${placa}`)
  }

  postControlVehiculo(controlVehiculoRegister: ControlVehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", controlVehiculoRegister);

    return this.http.post(this.WEB_URL + '/control', controlVehiculoRegister)

  }

  updateNetoTotalVehiculo(idVehiculo: string, netoTotal: number) {
    console.log("LLEGA netoTotal a actualizar", netoTotal);
    const sumaNetos = {
      'netoTotal': netoTotal
    }

    return this.http.put(this.WEB_URL + '/vehiculo/netos/' + idVehiculo, sumaNetos)
    // return this.http.post('http://localhost:3000/control', controlVehiculoRegister)
  }
}
