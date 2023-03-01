import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehiculoModel } from 'src/app/models/vehiculo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getVehiculo() {
    return this.http.get(this.WEB_URL + '/vehiculo');
  }

  getVehiculoID(id: string) {
    return this.http.get(this.WEB_URL + `/vehiculo/${id}`);
  }

  postVehiculo(vehiculoRegister: VehiculoModel) {
    console.log("LLEGA INFO DEL FORMULARIO", vehiculoRegister);

    return this.http.post(this.WEB_URL + '/vehiculo', vehiculoRegister)
    
  }

  putRodamiento(id: string, rodamiento: object) {
    console.log("rodamiento", rodamiento)
    console.log("ID", id)
    return this.http.put('http://localhost:3000/vehiculo/rodamiento/' + id, rodamiento)
  }

  putPicoPlaca(id: string, PyP: object) {
    console.log("rodamiento", PyP)
    console.log("ID", id)
    return this.http.put('http://localhost:3000/vehiculo/picoplaca/' + id, PyP)
  }

  putGastosAdmin(id: string, gastosAdmin: object) {
    console.log("LLEGA LISTA A ACTUALIZAR", gastosAdmin)
    return this.http.put('http://localhost:3000/vehiculo/gastosAdmin/' + id, gastosAdmin)
  }

  putMantenimiento_taller(id: string, mantenimientoTaller: object) {
    console.log("LLEGA LISTA A ACTUALIZAR", mantenimientoTaller)
    return this.http.put('http://localhost:3000/vehiculo/mantenimientoTaller/' + id, mantenimientoTaller)
  }

  putEstado(id: string, estado:any) {

    return this.http.put('http://localhost:3000/vehiculo/estado/' + id, estado)

  }
}
