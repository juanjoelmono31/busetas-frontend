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

  putPicoPlaca(id: string, PyP: object) {
    console.log("rodamiento", PyP)
    console.log("ID", id)
    return this.http.put('http://54.164.205.82:3000/vehiculo/picoplaca/' + id, PyP)
  }

  putGastosAdmin(id: string, gastosAdmin: object) {
    console.log("LLEGA LISTA A ACTUALIZAR", gastosAdmin)
    return this.http.put('http://54.164.205.82:3000/vehiculo/gastosAdmin/' + id, gastosAdmin)
  }

  putMantenimiento_taller(id: string, mantenimientoTaller: object) {
    console.log("LLEGA LISTA A ACTUALIZAR", mantenimientoTaller)
    return this.http.put('http://54.164.205.82:3000/vehiculo/mantenimientoTaller/' + id, mantenimientoTaller)
  }
}
